import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-recruiter',
  templateUrl: './recruiter.component.html',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  styleUrls: ['./recruiter.component.css']
})
export class RecruiterComponent {
  constructor(private router: Router) {}


}

