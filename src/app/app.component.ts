import { Component } from '@angular/core';

import { ThemeService } from './theme/theme.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	activeTab = 'home';
	activeTheme = 'dark';

	selectedImage: string | null = null;

	constructor(private themeService: ThemeService) { }

	toggle() {
		this.activeTheme = this.themeService.getActiveTheme().name;
		this.activeTheme = this.activeTheme === 'light' ? 'dark' : 'light';
		this.themeService.setTheme(this.activeTheme);
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
