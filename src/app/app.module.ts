import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { darkTheme } from './theme/dark';
import { lightTheme } from './theme/light';
import { ThemeModule } from './theme/theme.module';
import { AppComponent } from './app.component';
import { GalleryModalComponent } from './gallery-modal/gallery-modal.component';

@NgModule({
	declarations: [AppComponent, GalleryModalComponent],
	imports: [
		BrowserModule,
		ThemeModule.forRoot({
			themes: [lightTheme, darkTheme],
			active: 'dark'
		}),
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
