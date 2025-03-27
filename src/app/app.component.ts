import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from "./pages/navbar/navbar.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  template: `
    <app-navbar></app-navbar>
    <div style="margin-top: 80px;">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {
  title = 'frontend1';
}
