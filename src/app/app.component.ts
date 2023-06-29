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

	constructor(private themeService: ThemeService) { }

	toggle() {
		this.activeTheme = this.themeService.getActiveTheme().name;
		this.activeTheme = this.activeTheme === 'light' ? 'dark' : 'light';
		this.themeService.setTheme(this.activeTheme);
	}

	openWebsite(url: string): void {
		window.open(url, '_blank');
	}
}
