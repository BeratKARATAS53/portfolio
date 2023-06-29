import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { darkTheme } from './theme/dark';
import { lightTheme } from './theme/light';
import { ThemeModule } from './theme/theme.module';

@NgModule({
	declarations: [
		AppComponent
	],
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
