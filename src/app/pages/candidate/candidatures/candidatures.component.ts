import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

interface Candidat {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone?: string;
  cv?: string;
  photoUrl?: string;
}

interface Offre {
  id: number;
  titre: string;
  entreprise: string;
  description: string;
  localisation: string;
  datePublication: Date;
}

interface Candidature {
  id: number;
  candidat: Candidat;
  offre: Offre;
  dateCandidature: Date;
  statut: string; // "en attente", "validée", "rejetée"
}

@Component({
  selector: 'app-candidatures',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './candidatures.component.html',
  styleUrl: './candidatures.component.css'
})
export class CandidaturesComponent implements OnInit {
  candidatures: Candidature[] = [];
  filteredCandidatures: Candidature[] = [];
  loading = true;
  error = '';

  // Variables de filtrage et recherche
  searchTerm = '';
  statusFilter = 'tous';
  dateFilter = 'tous';

  constructor() { }

  ngOnInit(): void {
    // Simuler des données pour la démonstration
    // Dans une application réelle, vous utiliseriez un service pour charger les données
    this.simulateDataFetch();
  }

  simulateDataFetch(): void {
    // Données fictives pour la démonstration
    setTimeout(() => {
      this.candidatures = [
        {
          id: 1,
          candidat: {
            id: 101,
            nom: 'Dupont',
            prenom: 'Jean',
            email: 'jean.dupont@example.com'
          },
          offre: {
            id: 201,
            titre: 'Développeur Frontend Angular',
            entreprise: 'Tech Solutions',
            description: 'Poste de développeur frontend spécialisé en Angular',
            localisation: 'Paris',
            datePublication: new Date('2025-03-15')
          },
          dateCandidature: new Date('2025-03-20'),
          statut: 'en attente'
        },
        {
          id: 2,
          candidat: {
            id: 101,
            nom: 'Dupont',
            prenom: 'Jean',
            email: 'jean.dupont@example.com'
          },
          offre: {
            id: 202,
            titre: 'Développeur Backend Java',
            entreprise: 'InnoSoft',
            description: 'Développement d\'applications backend en Java',
            localisation: 'Lyon',
            datePublication: new Date('2025-03-10')
          },
          dateCandidature: new Date('2025-03-12'),
          statut: 'validée'
        },
        {
          id: 3,
          candidat: {
            id: 101,
            nom: 'Dupont',
            prenom: 'Jean',
            email: 'jean.dupont@example.com'
          },
          offre: {
            id: 203,
            titre: 'Architecte Solution',
            entreprise: 'Global Systems',
            description: 'Conception d\'architectures pour applications d\'entreprise',
            localisation: 'Bordeaux',
            datePublication: new Date('2025-02-28')
          },
          dateCandidature: new Date('2025-03-01'),
          statut: 'rejetée'
        }
      ];

      this.applyFilters();
      this.loading = false;
    }, 1000);
  }

  loadCandidatures(): void {
    // Dans une application réelle, vous feriez appel à un service
    // Exemple:
    // this.candidatureService.getCandidaturesByCandidat(userId).subscribe({
    //   next: (data) => {
    //     this.candidatures = data;
    //     this.applyFilters();
    //     this.loading = false;
    //   },
    //   error: (err) => {
    //     this.error = 'Erreur lors du chargement des candidatures';
    //     this.loading = false;
    //   }
    // });
  }

  applyFilters(): void {
    let result = [...this.candidatures];

    // Filtre par terme de recherche
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase().trim();
      result = result.filter(c =>
        c.offre.titre.toLowerCase().includes(term) ||
        c.offre.entreprise.toLowerCase().includes(term)
      );
    }

    // Filtre par statut
    if (this.statusFilter !== 'tous') {
      result = result.filter(c => c.statut.toLowerCase() === this.statusFilter.toLowerCase());
    }

    // Filtre par date
    if (this.dateFilter !== 'tous') {
      const now = new Date();
      const oneDay = 24 * 60 * 60 * 1000;
      const oneWeek = 7 * oneDay;
      const oneMonth = 30 * oneDay;

      result = result.filter(c => {
        const candidatureDate = new Date(c.dateCandidature);
        const diffTime = now.getTime() - candidatureDate.getTime();

        switch (this.dateFilter) {
          case 'aujourd\'hui':
            return diffTime < oneDay;
          case 'semaine':
            return diffTime < oneWeek;
          case 'mois':
            return diffTime < oneMonth;
          default:
            return true;
        }
      });
    }

    this.filteredCandidatures = result;
  }

  onSearch(): void {
    this.applyFilters();
  }

  onFilterChange(): void {
    this.applyFilters();
  }

  getStatusClass(statut: string): string {
    switch (statut.toLowerCase()) {
      case 'en attente':
        return 'status-pending';
      case 'validée':
        return 'status-approved';
      case 'rejetée':
        return 'status-rejected';
      default:
        return '';
    }
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('fr-FR');
  }

  retirerCandidature(id: number): void {
    // Dans une application réelle, appelez un service
    // this.candidatureService.deleteCandidature(id).subscribe({...})

    // Pour la démo, supprime simplement de l'array local
    this.candidatures = this.candidatures.filter(c => c.id !== id);
    this.applyFilters();
  }
}
