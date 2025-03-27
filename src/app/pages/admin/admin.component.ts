import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  adminProfile: any = {
    name: 'Admin',
    email: 'admin@example.com',
    role: 'ADMIN',
    lastLogin: new Date().toLocaleString()
  };

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loadAdminProfile();
  }

  loadAdminProfile() {
    // En production, vous utiliseriez un service API :
    // this.authService.getProfile().subscribe(profile => {
    //   this.adminProfile = profile;
    // });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
