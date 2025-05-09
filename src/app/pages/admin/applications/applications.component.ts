import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule, DatePipe} from '@angular/common';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  imports: [
    FormsModule,
    DatePipe,
    CommonModule
  ],
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent {
  // Liste des candidatures
  applications = [
    {
      id: 1,
      candidateName: 'Imane Salimi',
      jobTitle: 'Développeur Java',
      company: 'Tech Corp',
      dateApplied: new Date('2024-10-05'),
      status: 'Acceptée'
    },
    {
      id: 2,
      candidateName: 'Khalil Mohamed-Saad',
      jobTitle: 'Architecte Logiciel',
      company: 'InnovateX',
      dateApplied: new Date('2024-09-28'),
      status: 'En attente'
    },
    {
      id: 3,
      candidateName: 'Youssef Aniss',
      jobTitle: 'Data Analyst',
      company: 'Analytics Co.',
      dateApplied: new Date('2024-09-20'),
      status: 'Refusée'
    }
  ];

  selectedStatus = '';
  filteredApplications = [...this.applications];

  // Retourne la classe CSS en fonction du statut
  getStatusClass(status: string): string {
    switch (status) {
      case 'En attente':
        return 'badge badge-pending';
      case 'Acceptée':
        return 'badge badge-approved';
      case 'Refusée':
        return 'badge badge-rejected';
      default:
        return 'badge';
    }
  }

  // Filtre les candidatures selon le statut sélectionné
  filterApplications(): void {
    if (this.selectedStatus) {
      this.filteredApplications = this.applications.filter(
        app => app.status === this.selectedStatus
      );
    } else {
      this.filteredApplications = [...this.applications];
    }
  }

  // Action : Voir les détails
  viewDetails(app: any): void {
    alert(`Détails de la candidature pour ${app.jobTitle} - ${app.candidateName}`);
  }

  // Action : Annuler une candidature
  cancelApplication(app: any): void {
    if (confirm(`Êtes-vous sûr de vouloir annuler votre candidature pour "${app.jobTitle}" ?`)) {
      this.applications = this.applications.filter(a => a.id !== app.id);
      this.filterApplications();
      alert('Votre candidature a été annulée.');
    }
  }
}
