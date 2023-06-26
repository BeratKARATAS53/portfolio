import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	activeTab = 'home';

	constructor() {}

	openWebsite(url: string): void {
		window.open(url, '_blank');
	}
}
