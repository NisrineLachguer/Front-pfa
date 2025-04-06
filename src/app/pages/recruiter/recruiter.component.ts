import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-recruiter',
  templateUrl: './recruiter.component.html',
  styleUrls: ['./recruiter.component.css']
})
export class RecruiterComponent implements OnInit {
  recruiterProfile: any = {
    name: 'Recruiter Name',
    email: 'recruiter@example.com',
    role: 'RECRUITER',
    lastLogin: new Date().toLocaleString()
  };

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loadRecruiterProfile();
  }

  loadRecruiterProfile() {
    // In production, you would use an API service to load the profile
    // this.authService.getProfile().subscribe(profile => {
    //   this.recruiterProfile = profile;
    // });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
