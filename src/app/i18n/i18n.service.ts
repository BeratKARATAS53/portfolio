import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { portfolioContent, PortfolioContent, Lang } from './portfolio-content';

const STORAGE_KEY = 'portfolio-lang';

@Injectable({ providedIn: 'root' })
export class I18nService {
	private readonly langSubject = new BehaviorSubject<Lang>(this.loadLang());

	readonly lang$ = this.langSubject.asObservable();

	get lang(): Lang {
		return this.langSubject.value;
	}

	get content(): PortfolioContent {
		return portfolioContent[this.lang];
	}

	t(key: string): string {
		const keys = key.split('.');
		let value: unknown = portfolioContent[this.lang].labels;

		for (const k of keys) {
			if (value && typeof value === 'object' && k in (value as Record<string, unknown>)) {
				value = (value as Record<string, unknown>)[k];
			} else {
				return key;
			}
		}

		return typeof value === 'string' ? value : key;
	}

	setLang(lang: Lang): void {
		if (lang === this.lang) {
			return;
		}

		this.langSubject.next(lang);
		localStorage.setItem(STORAGE_KEY, lang);
		document.documentElement.lang = lang;
	}

	toggleLang(): void {
		this.setLang(this.lang === 'tr' ? 'en' : 'tr');
	}

	private loadLang(): Lang {
		const stored = localStorage.getItem(STORAGE_KEY);
		const lang: Lang = stored === 'en' ? 'en' : 'tr';
		document.documentElement.lang = lang;
		return lang;
	}
}
