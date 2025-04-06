import { Component } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  styleUrls: ['./candidate.component.css']
})
export class CandidateComponent {

  constructor(private router: Router) {}

}
