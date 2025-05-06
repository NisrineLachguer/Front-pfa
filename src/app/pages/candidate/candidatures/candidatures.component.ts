import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { CandidatureService} from '../../../shared/service/candidature/candidature.service';
import { AuthService } from '../../../auth/auth.service';

// Interfaces alignées avec les DTOs du backend
interface CandidatureDto {
  id: number;
  candidatId: number;
  offreId: number;
  statut: string; // "en attente", "validée", "rejetée"
  dateCandidature: Date;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  formation: string;
  experience: string;
  competences: string;
  motivation: string;
  disponibilite: string;
  offreTitre: string; // Titre de l'offre associée
  // Autres propriétés dynamiques pour l'affichage
  offre?: {
    id: number;
    posteTitre: string;
    description: string;
    localisation: string;
    datePublication: Date;
    nomEntreprise: string;
    secteurActivite: string;
  };
}

interface Offre {
  id: number;
  posteTitre: string;
  description: string;
  localisation: string;
  datePublication: Date;
  nomEntreprise: string;
  secteurActivite: string;
  typeOffre: string;
  dureeMois?: number;
  status: string;
}


@Component({
  selector: 'app-candidatures',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './candidatures.component.html',
  styleUrl: './candidatures.component.css'
})
export class CandidaturesComponent implements OnInit {
  candidatures: CandidatureDto[] = [];
  filteredCandidatures: CandidatureDto[] = [];
  loading = true;
  error = '';
  selectedCandidature: CandidatureDto | null = null;
  showDetailsModal = false;

  // Variables de filtrage et recherche
  searchTerm = '';
  statusFilter = 'tous';
  dateFilter = 'tous';

  constructor(
    private candidatureService: CandidatureService,
    private authService: AuthService,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.loadCandidatures()
  }

  loadCandidatures(): void {
    this.loading = true;
    this.error = '';

    this.candidatureService.getMesCandidatures().subscribe({
      next: (data) => {
        console.log('Candidatures chargées:', data);
        // Transformation des données reçues pour l'affichage
        this.candidatures = data.map((item: any) => {
          // Création d'une structure compatible avec le template
          return {
            ...item,
            offre: {
              id: item.offreId,
              posteTitre: item.offreTitre || 'Sans titre',
              // Utilisez les champs directement depuis l'item ou des valeurs par défaut
              localisation: item.localisation || 'Non spécifiée',
              nomEntreprise: item.nomEntreprise || 'Entreprise'
            }
          };
        });
        this.applyFilters();
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur de chargement des candidatures', err);
        this.error = 'Erreur lors du chargement des candidatures';
        this.loading = false;
      }
    });
  }

  applyFilters(): void {
    let result = [...this.candidatures];

    // Filtre par terme de recherche
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase().trim();
      result = result.filter(c =>
        (c.offreTitre?.toLowerCase().includes(term) ?? false) ||
       (c.offre?.nomEntreprise?.toLowerCase().includes(term) ?? false) ||
        (c.offre?.nomEntreprise?.toLowerCase().includes(term) ?? false)
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
    /**switch (statut.toLowerCase()) {
      case 'en attente':
        return 'status-pending';
      case 'validée':
        return 'status-approved';
      case 'rejetée':
        return 'status-rejected';
      default:
        return '';
    }**/
    switch (statut.toLowerCase()) {
      case 'validée':
        return 'status-badge status-validée';
      case 'rejetée':
        return 'status-badge status-rejetée';
      case 'en attente':
      default:
        return 'status-badge status-en-attente';
    }
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('fr-FR');
  }

  retirerCandidature(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir retirer cette candidature ?')) {
      this.candidatureService.deleteCandidature(id).subscribe({
        next: () => {
          this.candidatures = this.candidatures.filter(c => c.id !== id);
          this.applyFilters();
        },
        error: (err) => {
          console.error('Erreur lors du retrait de la candidature', err);
          this.error = 'Erreur lors du retrait de la candidature';
        }
      });
    }
  }

  viewCandidatureDetails(candidature: CandidatureDto): void {
    this.selectedCandidature = candidature;
    this.showDetailsModal = true;
    document.body.style.overflow = 'hidden'; // Empêche le défilement de la page derrière le modal

    // l'animation
    setTimeout(() => {
      const modalElement = document.querySelector('.modal') as HTMLElement;
      if (modalElement) {
        modalElement.classList.add('show', 'animate');
      }
    }, 10);

  }

  //Ferme le modal des détails de candidature
  closeDetailsModal(): void {
    const modalElement = document.querySelector('.modal') as HTMLElement;
    if (modalElement) {
      modalElement.classList.remove('show');

      // Attendez que l'animation de fermeture soit terminée
      setTimeout(() => {
        this.showDetailsModal = false;
        this.selectedCandidature = null;
        document.body.style.overflow = ''; // Restaure le défilement de la page
      }, 300);
    } else {
      this.showDetailsModal = false;
      this.selectedCandidature = null;
      document.body.style.overflow = '';
    }
  }

  downloadCandidatureCV(id: number): void {
    this.candidatureService.downloadCV(id).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `candidature_cv_${id}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      },
      error: (err) => {
        console.error('Erreur lors du téléchargement du CV', err);
        this.error = 'Erreur lors du téléchargement du CV';
      }
    });
  }

  // Ajoutez ces propriétés à votre classe
  showOffreDetailsModal = false;
  selectedOffre: Offre | null = null;

  /**
   * Affiche le modal des détails de l'offre
   */
  viewOffreDetails(offreId: number): void {
    // Fermez le modal de candidature s'il est ouvert
    if (this.showDetailsModal) {
      this.closeDetailsModal();
      // Attendre la fermeture du premier modal avant d'ouvrir le second
      setTimeout(() => {
        this.loadOffreDetails(offreId);
      }, 350);
    } else {
      this.loadOffreDetails(offreId);
    }
  }

  /**
   * Charge les détails de l'offre et affiche le modal
   */
  private loadOffreDetails(offreId: number): void {
    this.loading = true;

    // Appelez le service pour obtenir les détails de l'offre
    this.http.get<Offre>(`http://localhost:8080/api/v1/offres/${offreId}`).subscribe({
      next: (offre) => {
        this.selectedOffre = offre;
        this.showOffreDetailsModal = true;
        this.loading = false;
        document.body.style.overflow = 'hidden'; // Empêche le défilement de la page derrière le modal

        // Ajoutez un petit délai pour l'animation
        setTimeout(() => {
          const modalElement = document.querySelector('.modal') as HTMLElement;
          if (modalElement) {
            modalElement.classList.add('show', 'animate');
          }
        }, 10);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des détails de l\'offre', err);
        this.error = 'Erreur lors de la récupération des détails de l\'offre';
        this.loading = false;
      }
    });
  }


  closeOffreDetailsModal(): void {
    const modalElement = document.querySelector('.modal') as HTMLElement;
    if (modalElement) {
      modalElement.classList.remove('show');

      // Attendez que l'animation de fermeture soit terminée
      setTimeout(() => {
        this.showOffreDetailsModal = false;
        this.selectedOffre = null;
        document.body.style.overflow = '';
      }, 300);
    } else {
      this.showOffreDetailsModal = false;
      this.selectedOffre = null;
      document.body.style.overflow = '';
    }
  }

  getOffreStatusLabel(status: string): string {
    switch (status) {
      case 'active': return 'Active';
      case 'draft': return 'Brouillon';
      case 'closed': return 'Clôturée';
      default: return status;
    }
  }
  getOffreStatusClass(status: string): string {
    switch (status) {
      case 'active':
        return 'status-active';
      case 'draft':
        return 'status-draft';
      case 'closed':
        return 'status-closed';
      default:
        return '';
    }
  }





}
