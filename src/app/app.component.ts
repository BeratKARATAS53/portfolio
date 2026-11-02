import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, ViewChild } from '@angular/core';

import { I18nService } from './i18n/i18n.service';
import { Lang, PortfolioContent } from './i18n/portfolio-content';
import { StudioDirectorService, StudioPhase } from './studio/studio-director.service';
import { ThemeService } from './theme/theme.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	standalone: false
})
export class AppComponent implements AfterViewInit, OnDestroy {
	activeSection = 'about';
	activeTheme = 'dark';
	selectedImage: string | null = null;
	phase: StudioPhase = 'boot';
	menuOpen = false;

	private readonly sectionIds = ['about', 'projects', 'internships', 'hobbies'];

	@ViewChild('studioRoot', { static: true }) studioRoot!: ElementRef<HTMLElement>;
	@ViewChild('overlay', { static: true }) overlay!: ElementRef<HTMLElement>;
	@ViewChild('trailCanvas', { static: true }) trailCanvas!: ElementRef<HTMLCanvasElement>;

	constructor(
		public i18n: I18nService,
		private themeService: ThemeService,
		private studio: StudioDirectorService
	) { }

	get content(): PortfolioContent {
		return this.i18n.content;
	}

	ngAfterViewInit(): void {
		requestAnimationFrame(() => {
			this.studio.start({
				root: this.studioRoot.nativeElement,
				overlay: this.overlay.nativeElement,
				canvas: this.trailCanvas.nativeElement,
				labels: this.content.labels.studio.agents,
				onPhase: (phase) => {
					this.phase = phase;
					if (phase === 'live') {
						this.updateActiveSection();
					}
				}
			});
		});
	}

	ngOnDestroy(): void {
		this.studio.stop();
	}

	toggleTheme(): void {
		this.activeTheme = this.themeService.getActiveTheme().name;
		this.activeTheme = this.activeTheme === 'light' ? 'dark' : 'light';
		this.themeService.setTheme(this.activeTheme);
	}

	setLang(lang: Lang): void {
		this.i18n.setLang(lang);
	}

	openWebsite(url: string): void {
		window.open(url, '_blank');
	}

	scrollTo(id: string): void {
		this.activeSection = id;
		this.menuOpen = false;
		this.studio.snapSection(id);
		requestAnimationFrame(() => {
			document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
		});
	}

	toggleMenu(): void {
		this.menuOpen = !this.menuOpen;
	}

	openImage(src: string): void {
		this.selectedImage = src;
		const modal = document.getElementById('imageModal') as HTMLDialogElement;
		modal.showModal();
	}

	closeModal(): void {
		const modal = document.getElementById('imageModal') as HTMLDialogElement;
		modal.close();
		this.selectedImage = null;
	}

	@HostListener('window:scroll')
	onScroll(): void {
		if (this.phase === 'live') {
			this.updateActiveSection();
		}
	}

	@HostListener('window:keydown.escape')
	onEscape(): void {
		this.menuOpen = false;
	}

	private updateActiveSection(): void {
		const probe = 132;
		let current = 'about';
		for (const id of this.sectionIds) {
			const el = document.getElementById(id);
			if (el && el.getBoundingClientRect().top <= probe) {
				current = id;
			}
		}
		this.activeSection = current;
	}
}
