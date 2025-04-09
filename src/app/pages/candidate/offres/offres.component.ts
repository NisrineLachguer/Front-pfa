import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../auth/auth.service';
import { OffreService } from '../../../core/offre/offre.service';
import {TruncatePipe} from '../../../shared/pipes/truncate.pipe';

interface Offre {
  id: number;
  posteTitre: string;
  description: string;
  localisation: string;
  datePublication: string;
  typeOffre: string;
  dureeMois?: number;
  secteurActivite?: string;
  nomEntreprise?: string;
  status: string; // Ajouté pour la cohérence avec offres-list
}

@Component({
  selector: 'app-offres',
  templateUrl: './offres.component.html',
  standalone: true,
  styleUrls: ['./offres.component.css'],
  imports: [CommonModule, FormsModule, TruncatePipe]
})
export class OffresComponent implements OnInit {
  offres: Offre[] = [];
  filteredOffres: Offre[] = [];
  searchTerm: string = '';
  selectedLocation: string = '';
  selectedSector: string = '';
  showApplyModal: boolean = false;
  currentOffre: Offre | null = null;
  isLoading: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private offreService: OffreService
  ) {}

  ngOnInit(): void {
    if (!this.authService.hasRole('CANDIDATE')) {
      this.router.navigate(['/unauthorized']);
      return;
    }
    this.loadOffres();
  }

  loadOffres(): void {
    this.isLoading = true;
    this.offreService.getOffresForCandidat().subscribe({
      next: (offres: any[]) => {
        this.offres = offres.map(offre => ({
          ...offre,
          typeOffre: offre.typeOffre || 'Inconnu'
        })) as Offre[];
        this.filteredOffres = [...this.offres];
        this.isLoading = false;
      },
    });
  }

  // Méthodes de statut (comme dans offres-list)
  getStatusLabel(status: string): string {
    switch (status) {
      case 'active': return 'Active';
      case 'draft': return 'Brouillon';
      case 'closed': return 'Clôturée';
      default: return status;
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'active': return 'status-active';
      case 'draft': return 'status-draft';
      case 'closed': return 'status-closed';
      default: return '';
    }
  }

  filterOffres(): void {
    this.filteredOffres = this.offres.filter(offre => {
      const matchesSearch = this.searchTerm ?
        offre.posteTitre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        offre.description.toLowerCase().includes(this.searchTerm.toLowerCase()) :
        true;

      const matchesLocation = this.selectedLocation ?
        offre.localisation === this.selectedLocation :
        true;

      const matchesSector = this.selectedSector ?
        offre.secteurActivite === this.selectedSector :
        true;

      return matchesSearch && matchesLocation && matchesSector;
    });
  }

  getUniqueLocations(): string[] {
    const locations = new Set<string>();
    this.offres.forEach(offre => locations.add(offre.localisation));
    return Array.from(locations);
  }

  getUniqueSectors(): string[] {
    const sectors = new Set<string>();
    this.offres.forEach(offre => {
      if (offre.secteurActivite) {
        sectors.add(offre.secteurActivite);
      }
    });
    return Array.from(sectors);
  }

// Ajoutez ces méthodes à votre classe OffresComponent
  openApplyModal(offre: Offre): void {
    this.currentOffre = offre;
    this.showApplyModal = true;
  }

  closeModal(): void {
    this.showApplyModal = false;
    this.currentOffre = null;
  }

  selectApplyMethod(method: 'form' | 'upload'): void {
    console.log(`Méthode de candidature sélectionnée: ${method}`);
    console.log(`Candidature pour le poste: ${this.currentOffre?.posteTitre}`);
    // Ici, vous pouvez ajouter la logique pour chaque méthode de candidature

    // Pour l'instant, fermons simplement le modal
    this.closeModal();
  }


}
