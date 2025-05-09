import { Component, AfterViewInit } from '@angular/core';
import Chart from 'chart.js/auto';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true
})
export class DashboardComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    this.initRevenueChart();
    this.initUserActivityChart();
  }

  initRevenueChart() {
    const ctx = document.getElementById('revenueChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'],
        datasets: [
          {
            label: 'Revenus',
            data: [120, 190, 300, 500, 600],
            borderColor: '#42a5f5',
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  initUserActivityChart() {
    const ctx = document.getElementById('activityChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'],
        datasets: [
          {
            label: 'Activité utilisateur',
            data: [10, 20, 30, 40, 50],
            backgroundColor: '#7e57c2'
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
