import { Directive, OnInit, ElementRef } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ThemeService } from './theme.service';
import { Theme } from './symbols';

@Directive({
	selector: '[appTheme]'
})
export class ThemeDirective implements OnInit {

	private unsubscribe = new Subject();
	constructor(
		private _elementRef: ElementRef,
		private _themeService: ThemeService
	) { }

	ngOnInit() {
		const active = this._themeService.getActiveTheme();
		if (active) {
			this.updateTheme(active);
		}
		this._themeService.themeChange.pipe(takeUntil(this.unsubscribe))
			.subscribe((theme: Theme) => this.updateTheme(theme));
	}

	updateTheme(theme: Theme) {
		for (const key in theme.properties) {
			this._elementRef.nativeElement.style.setProperty(key, theme.properties[key]);
		}
	}

}
