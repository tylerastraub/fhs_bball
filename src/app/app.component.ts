import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, SidebarComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
    title = 'FHS Fantasy Basketball';
}
