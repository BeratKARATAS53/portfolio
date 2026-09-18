import { Component } from '@angular/core';

import { I18nService } from './i18n/i18n.service';
import { Lang, PortfolioContent } from './i18n/portfolio-content';
import { ThemeService } from './theme/theme.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	standalone: false
})
export class AppComponent {
	activeTab = 'home';
	activeTheme = 'dark';
	selectedImage: string | null = null;

	constructor(
		public i18n: I18nService,
		private themeService: ThemeService
	) { }

	get content(): PortfolioContent {
		return this.i18n.content;
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
}
