import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterOutlet, provideRouter } from '@angular/router';
import { bootstrapApplication } from '@angular/platform-browser';
import { appRoutes } from './shared/routes';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        CommonModule,
        SidebarComponent,
        RouterOutlet,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
    title = 'FHS Fantasy Basketball';
}

bootstrapApplication(AppComponent, {
    providers: ([
        provideAnimations(),
    ])
})