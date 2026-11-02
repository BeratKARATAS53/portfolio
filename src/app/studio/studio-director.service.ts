import { Injectable, NgZone } from '@angular/core';

export type StudioPhase = 'boot' | 'orbit' | 'compose' | 'live';

export const AGENT_COLORS = ['#5CE1E6', '#FF6B9D', '#C8F542', '#FFB347', '#7B8CFF'];

export interface StudioAgent {
	id: number;
	color: string;
	label: string;
	el: HTMLElement;
	x: number;
	y: number;
	busy: boolean;
}

export interface StudioHooks {
	root: HTMLElement;
	overlay: HTMLElement;
	canvas: HTMLCanvasElement;
	labels: string[];
	onPhase: (phase: StudioPhase) => void;
}

interface TrailDot {
	x: number;
	y: number;
	color: string;
	life: number;
}

@Injectable({ providedIn: 'root' })
export class StudioDirectorService {
	phase: StudioPhase = 'boot';
	agents: StudioAgent[] = [];

	private hooks: StudioHooks | null = null;
	private gen = 0;
	private alive = false;
	private trailLoop = 0;
	private observer: IntersectionObserver | null = null;
	private queue: HTMLElement[] = [];
	private trails: TrailDot[] = [];
	private ctx: CanvasRenderingContext2D | null = null;
	private reduced = false;

	constructor(private zone: NgZone) {}

	start(hooks: StudioHooks): void {
		this.stop();
		this.hooks = hooks;
		this.alive = true;
		this.reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		this.zone.runOutsideAngular(() => {
			void this.run();
		});
	}

	skip(): void {
		this.gen += 1;
		this.finishAll();
		this.setPhase('live');
		this.parkAll();
		this.observe();
	}

	setLabels(labels: string[]): void {
		if (this.hooks) {
			this.hooks.labels = labels;
		}
		this.agents.forEach((agent, id) => {
			agent.label = labels[id] ?? agent.label;
			const tag = agent.el.querySelector('span');
			if (tag) {
				tag.textContent = agent.label;
			}
		});
	}

	snapSection(id: string): void {
		const root = this.hooks?.root;
		if (!root) {
			return;
		}

		const targets = id === 'about'
			? [root.querySelector('[data-intro="top"]'), root.querySelector('#about'), root.querySelector('#education'), root.querySelector('#work')]
			: [root.querySelector(`#${id}`)];

		targets.forEach((node) => {
			if (node instanceof HTMLElement) {
				this.snapInk(node);
			}
		});
	}

	refreshCopy(): void {
		this.typedNodes().forEach((node) => {
			const full = node.getAttribute('data-full') ?? '';
			if (node.closest('.is-inked')) {
				if (node.hasAttribute('data-type-html')) {
					node.innerHTML = full;
				} else {
					node.textContent = full;
				}
			}
		});
	}

	stop(): void {
		this.alive = false;
		this.gen += 1;
		this.observer?.disconnect();
		this.observer = null;
		this.queue = [];
		cancelAnimationFrame(this.trailLoop);
		this.agents.forEach((agent) => agent.el.remove());
		this.agents = [];
		this.trails = [];
		if (this.hooks) {
			this.hooks.overlay.querySelectorAll('.stroke-svg').forEach((node) => node.remove());
		}
	}

	private async run(): Promise<void> {
		const g = ++this.gen;
		const hooks = this.hooks;
		if (!hooks) {
			return;
		}

		this.prepareCanvas();
		this.buildAgents();
		this.loopTrails();
		this.lockScroll(true);

		if (this.reduced) {
			this.skip();
			this.lockScroll(false);
			return;
		}

		this.setPhase('orbit');
		await this.orbit(1000);
		if (g !== this.gen) {
			return;
		}

		this.setPhase('compose');
		this.lockScroll(false);
		await this.composeIntro();
		if (g !== this.gen) {
			return;
		}

		this.setPhase('live');
	}

	private setPhase(phase: StudioPhase): void {
		this.phase = phase;
		this.zone.run(() => this.hooks?.onPhase(phase));
	}

	private buildAgents(): void {
		const hooks = this.hooks;
		if (!hooks) {
			return;
		}

		const cx = window.innerWidth / 2;
		const cy = window.innerHeight / 2;

		this.agents = AGENT_COLORS.map((color, id) => {
			const el = document.createElement('div');
			el.className = `studio-agent agent-${id}`;
			el.style.setProperty('--agent', color);
			el.innerHTML = `
				<svg viewBox="0 0 24 24" aria-hidden="true">
					<path d="M5.2 2.9c-.4-.2-.8.1-.8.5v17.4c0 .5.6.8 1 .5l5.2-4.7c.1-.1.3-.2.5-.2h6.9c.5 0 .7-.6.4-.9L5.2 2.9Z"/>
				</svg>
				<span>${hooks.labels[id] ?? ''}</span>
			`;
			hooks.overlay.appendChild(el);
			const agent: StudioAgent = { id, color, label: hooks.labels[id], el, x: cx, y: cy, busy: false };
			this.apply(agent);
			return agent;
		});
	}

	private async orbit(ms: number): Promise<void> {
		const cx = window.innerWidth / 2;
		const cy = window.innerHeight / 2 - 12;
		const radius = Math.min(72, window.innerWidth * 0.16);
		const t0 = performance.now();

		await new Promise<void>((resolve) => {
			const tick = (now: number) => {
				if (!this.alive) {
					resolve();
					return;
				}
				const t = Math.min(1, (now - t0) / ms);
				const spin = now / 180;
				this.agents.forEach((agent, i) => {
					const a = spin + (i / this.agents.length) * Math.PI * 2;
					agent.x = cx + Math.cos(a) * radius;
					agent.y = cy + Math.sin(a) * radius;
					this.apply(agent);
					this.dropTrail(agent);
				});
				if (t < 1) {
					requestAnimationFrame(tick);
				} else {
					resolve();
				}
			};
			requestAnimationFrame(tick);
		});
	}

	private async composeIntro(): Promise<void> {
		const root = this.hooks?.root;
		if (!root) {
			return;
		}

		const picks = ['top', 'nav', 'hero', 'card', 'tech']
			.map((key, i) => ({ el: root.querySelector<HTMLElement>(`[data-intro="${key}"]`), i }))
			.filter((item): item is { el: HTMLElement; i: number } => !!item.el);

		picks.forEach((item) => {
			item.el.dataset['queued'] = '1';
		});
		this.observe();

		await Promise.all(picks.map((item) => this.paint(this.agents[item.i], item.el, true)));
	}

	private observe(): void {
		this.observer?.disconnect();
		const root = this.hooks?.root;
		if (!root) {
			return;
		}

		this.observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					this.enqueue(entry.target as HTMLElement);
				}
			});
		}, { threshold: 0.22, rootMargin: '0px 0px -10% 0px' });

		root.querySelectorAll<HTMLElement>('[data-sketch]').forEach((el) => {
			if (!el.classList.contains('is-inked')) {
				this.observer?.observe(el);
			}
		});
	}

	private enqueue(el: HTMLElement): void {
		if (el.classList.contains('is-inked') || el.dataset['queued'] === '1') {
			return;
		}
		el.dataset['queued'] = '1';
		const free = this.agents.find((agent) => !agent.busy);
		if (free) {
			void this.paint(free, el, true);
		} else {
			this.queue.push(el);
		}
	}

	private drain(agent: StudioAgent): void {
		let next = this.queue.shift();
		while (next && next.classList.contains('is-inked')) {
			next = this.queue.shift();
		}
		if (!next) {
			next = this.nextVisibleSketch() ?? undefined;
			if (next) {
				next.dataset['queued'] = '1';
			}
		}
		if (next) {
			void this.paint(agent, next, true);
			return;
		}
		void this.dock(agent);
	}

	private nextVisibleSketch(): HTMLElement | null {
		const root = this.hooks?.root;
		if (!root) {
			return null;
		}

		const vh = window.innerHeight;
		return Array.from(root.querySelectorAll<HTMLElement>('[data-sketch]')).find((el) => {
			if (el.classList.contains('is-inked') || el.classList.contains('is-tracing') || el.dataset['queued'] === '1') {
				return false;
			}
			const rect = el.getBoundingClientRect();
			return rect.bottom > 48 && rect.top < vh - 48;
		}) ?? null;
	}

	private async paint(agent: StudioAgent, el: HTMLElement, typeInside: boolean): Promise<void> {
		if (!this.alive || el.classList.contains('is-inked') || el.classList.contains('is-tracing')) {
			return;
		}

		agent.busy = true;
		agent.el.classList.add('is-drawing');
		agent.el.classList.remove('is-docked', 'is-idle');
		el.classList.add('is-tracing');

		const rect = el.getBoundingClientRect();
		const pad = 6;
		const box = new DOMRect(rect.left - pad, rect.top - pad, rect.width + pad * 2, rect.height + pad * 2);
		const stroke = this.attachStroke(box, agent.color);

		await this.move(agent, box.left, box.top, 280);
		await this.traceRect(agent, box, Math.min(900, 420 + box.width * 0.15));

		el.classList.add('is-inked');
		el.classList.remove('is-tracing');
		this.fadeStroke(stroke);

		if (el.hasAttribute('data-palette')) {
			await this.scribble(agent, el);
		}

		if (typeInside) {
			const nested = Array.from(el.querySelectorAll<HTMLElement>('[data-type-ink]'));
			const nodes = el.matches('[data-type-ink]') ? [el, ...nested] : nested;
			for (const node of nodes) {
				await this.typeNode(agent, node);
			}
		}

		el.classList.add('is-written');
		agent.el.classList.remove('is-drawing');
		this.observer?.unobserve(el);
		this.drain(agent);
	}

	private async typeNode(agent: StudioAgent, node: HTMLElement): Promise<void> {
		const full = node.getAttribute('data-full') ?? '';
		if (!full) {
			return;
		}

		const asHtml = node.hasAttribute('data-type-html');
		const text = asHtml ? this.plainText(full) : full;
		node.textContent = '';

		const mark = document.createElement('span');
		mark.className = 'caret-mark';
		node.appendChild(mark);

		const start = mark.getBoundingClientRect();
		await this.move(agent, start.left, start.top + start.height * 0.35, 90, 'linear');

		const charsPerSecond = 180;
		const t0 = performance.now();
		let shown = 0;

		await new Promise<void>((resolve) => {
			const tick = (now: number) => {
				if (!this.alive) {
					resolve();
					return;
				}
				const target = Math.min(text.length, Math.floor((now - t0) / 1000 * charsPerSecond));
				if (target > shown) {
					mark.insertAdjacentText('beforebegin', text.slice(shown, target));
					shown = target;
					const caret = mark.getBoundingClientRect();
					agent.x = caret.left;
					agent.y = caret.top + caret.height * 0.35;
					this.apply(agent);
					this.dropTrail(agent);
				}
				if (shown < text.length) {
					requestAnimationFrame(tick);
				} else {
					resolve();
				}
			};
			requestAnimationFrame(tick);
		});

		mark.remove();
		if (asHtml) {
			node.innerHTML = full;
		} else {
			node.textContent = text;
		}
	}

	private plainText(value: string): string {
		const box = document.createElement('div');
		box.innerHTML = value;
		return (box.textContent ?? '').replace(/\s+/g, ' ').trim();
	}

	private async scribble(agent: StudioAgent, el: HTMLElement): Promise<void> {
		const r = el.getBoundingClientRect();
		for (let i = 0; i < 10; i++) {
			const x = r.left + 12 + Math.random() * Math.max(20, r.width - 24);
			const y = r.top + 12 + Math.random() * Math.max(20, r.height - 24);
			await this.move(agent, x, y, 70);
		}
	}

	private async traceRect(agent: StudioAgent, box: DOMRect, ms: number): Promise<void> {
		const pts: Array<[number, number]> = [
			[box.left, box.top],
			[box.right, box.top],
			[box.right, box.bottom],
			[box.left, box.bottom],
			[box.left, box.top],
		];
		const lens = pts.slice(1).map((p, i) => Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]));
		const peri = lens.reduce((a, b) => a + b, 0) || 1;

		for (let i = 0; i < lens.length; i++) {
			await this.move(agent, pts[i + 1][0], pts[i + 1][1], Math.max(80, ms * (lens[i] / peri)));
		}
	}

	private attachStroke(box: DOMRect, color: string): SVGSVGElement | null {
		const overlay = this.hooks?.overlay;
		if (!overlay) {
			return null;
		}

		const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
		svg.classList.add('stroke-svg');
		svg.style.left = `${box.left}px`;
		svg.style.top = `${box.top}px`;
		svg.style.width = `${box.width}px`;
		svg.style.height = `${box.height}px`;
		svg.setAttribute('viewBox', `0 0 ${box.width} ${box.height}`);

		const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
		const inset = 1.5;
		rect.setAttribute('x', String(inset));
		rect.setAttribute('y', String(inset));
		rect.setAttribute('width', String(Math.max(0, box.width - inset * 2)));
		rect.setAttribute('height', String(Math.max(0, box.height - inset * 2)));
		rect.setAttribute('rx', '18');
		rect.setAttribute('fill', 'none');
		rect.setAttribute('stroke', color);
		rect.setAttribute('stroke-width', '1.6');
		const peri = 2 * (box.width + box.height);
		rect.setAttribute('stroke-dasharray', String(peri));
		rect.setAttribute('stroke-dashoffset', String(peri));
		rect.style.transition = 'stroke-dashoffset .85s cubic-bezier(.4,0,.2,1)';
		svg.appendChild(rect);
		overlay.appendChild(svg);
		requestAnimationFrame(() => {
			rect.setAttribute('stroke-dashoffset', '0');
		});
		return svg;
	}

	private fadeStroke(svg: SVGSVGElement | null): void {
		if (!svg) {
			return;
		}
		svg.classList.add('is-done');
		window.setTimeout(() => svg.remove(), 520);
	}

	private move(agent: StudioAgent, x: number, y: number, duration: number, ease: 'cubic' | 'linear' = 'cubic'): Promise<void> {
		const x0 = agent.x;
		const y0 = agent.y;
		const t0 = performance.now();

		return new Promise((resolve) => {
			const step = (now: number) => {
				if (!this.alive) {
					resolve();
					return;
				}
				const t = Math.min(1, duration <= 0 ? 1 : (now - t0) / duration);
				const e = ease === 'linear' ? t : (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
				agent.x = x0 + (x - x0) * e;
				agent.y = y0 + (y - y0) * e;
				this.apply(agent);
				this.dropTrail(agent);
				if (t < 1) {
					requestAnimationFrame(step);
				} else {
					resolve();
				}
			};
			requestAnimationFrame(step);
		});
	}

	private apply(agent: StudioAgent): void {
		agent.el.style.transform = `translate3d(${agent.x}px, ${agent.y}px, 0)`;
	}

	private dropTrail(agent: StudioAgent): void {
		this.trails.push({ x: agent.x, y: agent.y, color: agent.color, life: 1 });
		if (this.trails.length > 220) {
			this.trails.splice(0, this.trails.length - 220);
		}
	}

	private prepareCanvas(): void {
		const canvas = this.hooks?.canvas;
		if (!canvas) {
			return;
		}
		const dpr = Math.min(window.devicePixelRatio || 1, 2);
		canvas.width = Math.floor(window.innerWidth * dpr);
		canvas.height = Math.floor(window.innerHeight * dpr);
		canvas.style.width = '100%';
		canvas.style.height = '100%';
		this.ctx = canvas.getContext('2d');
		this.ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
	}

	private loopTrails(): void {
		const tick = () => {
			if (!this.alive) {
				return;
			}
			const ctx = this.ctx;
			const canvas = this.hooks?.canvas;
			if (ctx && canvas) {
				ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
				this.trails = this.trails.filter((dot) => dot.life > 0.04);
				this.trails.forEach((dot) => {
					dot.life *= 0.9;
					ctx.beginPath();
					ctx.fillStyle = this.hexAlpha(dot.color, dot.life * 0.55);
					ctx.arc(dot.x, dot.y, 2.2 * dot.life + 0.6, 0, Math.PI * 2);
					ctx.fill();
				});
			}
			this.trailLoop = requestAnimationFrame(tick);
		};
		this.trailLoop = requestAnimationFrame(tick);
	}

	private hexAlpha(hex: string, alpha: number): string {
		const raw = hex.replace('#', '');
		const n = parseInt(raw, 16);
		const r = (n >> 16) & 255;
		const g = (n >> 8) & 255;
		const b = n & 255;
		return `rgba(${r}, ${g}, ${b}, ${alpha})`;
	}

	private async dock(agent: StudioAgent): Promise<void> {
		if (!this.alive) {
			return;
		}
		const point = this.dockPoint(agent.id);
		await this.move(agent, point.x, point.y, 420);
		agent.el.classList.add('is-docked');
		agent.el.classList.remove('is-drawing');
		agent.busy = false;
		if (this.queue.length) {
			this.drain(agent);
		}
	}

	private parkAll(): void {
		this.agents.forEach((agent) => {
			const point = this.dockPoint(agent.id);
			agent.x = point.x;
			agent.y = point.y;
			agent.busy = false;
			agent.el.classList.add('is-docked');
			agent.el.classList.remove('is-drawing', 'is-idle');
			this.apply(agent);
		});
	}

	private dockPoint(id: number): { x: number; y: number } {
		const dock = this.hooks?.root.querySelector<HTMLElement>('[data-agent-dock]');
		if (dock) {
			const r = dock.getBoundingClientRect();
			return { x: r.left + 10 + id * 34, y: r.top + 10 };
		}
		return { x: 28, y: window.innerHeight - 48 };
	}

	private snapInk(scope: HTMLElement): void {
		const nodes = [scope, ...Array.from(scope.querySelectorAll<HTMLElement>('[data-sketch]'))]
			.filter((el, i, arr) => el.hasAttribute('data-sketch') && arr.indexOf(el) === i);

		nodes.forEach((el) => {
			el.classList.add('is-inked', 'is-written');
			el.classList.remove('is-tracing');
			el.dataset['queued'] = '1';
			this.observer?.unobserve(el);
		});

		scope.querySelectorAll<HTMLElement>('[data-type-ink]').forEach((node) => {
			const full = node.getAttribute('data-full') ?? '';
			if (node.hasAttribute('data-type-html')) {
				node.innerHTML = full;
			} else {
				node.textContent = full;
			}
		});
		if (scope.matches('[data-type-ink]')) {
			const full = scope.getAttribute('data-full') ?? '';
			scope.textContent = full;
		}
	}

	private finishAll(): void {
		this.hooks?.root.querySelectorAll<HTMLElement>('[data-sketch]').forEach((el) => {
			el.classList.add('is-inked', 'is-written');
			el.classList.remove('is-tracing');
			el.dataset['queued'] = '1';
		});
		this.typedNodes().forEach((node) => {
			const full = node.getAttribute('data-full') ?? '';
			if (node.hasAttribute('data-type-html')) {
				node.innerHTML = full;
			} else {
				node.textContent = full;
			}
		});
		this.lockScroll(false);
	}

	private typedNodes(): HTMLElement[] {
		if (!this.hooks) {
			return [];
		}
		return Array.from(this.hooks.root.querySelectorAll<HTMLElement>('[data-type-ink]'));
	}

	private lockScroll(lock: boolean): void {
		document.documentElement.classList.toggle('studio-locked', lock);
		document.body.classList.toggle('studio-locked', lock);
	}
}
