import { Component } from '@angular/core';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-candidate',
  imports: [],
  templateUrl: './candidate.component.html',
  styleUrl: './candidate.component.css'
})
export class CandidateComponent {
  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
