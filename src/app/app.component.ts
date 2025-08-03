import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameOptionsComponent } from './modules/game-options/game-options.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    GameOptionsComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'MC-v2';
}
