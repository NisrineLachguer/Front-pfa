import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  imports: [
    CommonModule,
    FormsModule
  ],
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent {
  // Liste des villes
  cities: string[] = ['Marrakech', 'casa', 'Rabat', 'casa', 'casa'];

  // Données des offres d'emploi
  jobs: any[] = [
    {
      id: 1,
      title: 'Développeur Angular',
      company: 'Tech Solutions Inc.',
      city: 'Marrakech',
      description: 'Recherchons un développeur Angular expérimenté.',
      imageUrl: 'assets/logo-cv.jpg'
    },
    {
      id: 2,
      title: 'Architecte logiciel',
      company: 'Innovate Tech',
      city: 'casa',
      description: 'Nous cherchons un architecte logiciel pour concevoir des solutions robustes.',
      imageUrl: 'assets/logo-cv.jpg'
    },
    {
      id: 3,
      title: 'Développeur Full Stack',
      company: 'Web Masters Corp',
      city: 'Rabat',
      description: 'Rejoignez notre équipe de développement full stack.',
      imageUrl: 'assets/logo-cv.jpg'
    }
  ];

  // Valeur sélectionnée dans le filtre de ville
  selectedCity: string = '';

  // Offres d'emploi filtrées
  filteredJobs: any[] = [];

  ngOnInit(): void {
    this.filteredJobs = this.jobs; // Afficher toutes les offres au démarrage
  }

  // Méthode pour filtrer les offres d'emploi selon la ville sélectionnée
  filterJobs(): void {
    if (this.selectedCity) {
      this.filteredJobs = this.jobs.filter(job => job.city === this.selectedCity);
    } else {
      this.filteredJobs = this.jobs; // Afficher toutes les offres si aucune ville n'est sélectionnée
    }
  }
}
