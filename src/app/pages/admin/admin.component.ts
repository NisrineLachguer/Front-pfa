import { Component, OnInit } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { Chart, registerables } from 'chart.js';
import {CommonModule, NgClass} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {SidebarComponent} from '../../components/sidebar/sidebar.component';
import {HeaderComponent} from '../../components/header/header.component';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './admin.component.html',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatProgressBarModule,
    FontAwesomeModule,
    CommonModule,
    SidebarComponent,
    RouterOutlet
  ],
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  adminProfile: any = {
    name: 'Admin',
    email: 'admin@example.com',
    role: 'ADMIN',
    lastLogin: new Date().toLocaleString()
  };

  stats = [
    { title: 'Total Users', value: '1,243', icon: 'people', color: 'primary', progress: 70 },
    { title: 'Revenue', value: '$8,394', icon: 'attach_money', color: 'accent', progress: 45 },
    { title: 'New Signups', value: '42', icon: 'person_add', color: 'warn', progress: 85 },
    { title: 'Active Now', value: '56', icon: 'visibility', color: 'primary', progress: 60 }
  ];

  recentActivities = [
    { action: 'Updated user permissions', time: '2 mins ago', icon: 'security' },
    { action: 'Created new admin account', time: '15 mins ago', icon: 'person_add' },
    { action: 'Deleted inactive users', time: '1 hour ago', icon: 'delete' },
    { action: 'Updated system settings', time: '3 hours ago', icon: 'settings' }
  ];

  constructor(private authService: AuthService, private router: Router) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.loadAdminProfile();
    this.createCharts();
  }

  loadAdminProfile() {
    // In production, use API call:
    // this.authService.getProfile().subscribe(profile => {
    //   this.adminProfile = profile;
    // });
  }

  createCharts() {
    // Revenue Chart
    new Chart('revenueChart', {
      type: 'line',
      data: {
        labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        datasets: [{
          label: 'Revenue',
          data: [120, 190, 300, 250, 200, 230, 400],
          borderColor: '#3f51b5',
          backgroundColor: 'rgba(63, 81, 181, 0.1)',
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        }
      }
    });

    // Activity Chart
    new Chart('activityChart', {
      type: 'bar',
      data: {
        labels: ['2am', '4am', '8am', '10am', '12pm', '2pm', '4pm'],
        datasets: [{
          label: 'Activity',
          data: [200, 300, 400, 500, 300, 200, 100],
          backgroundColor: '#5425cf'
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        }
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
