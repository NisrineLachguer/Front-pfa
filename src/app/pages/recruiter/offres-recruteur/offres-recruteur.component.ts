import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../auth/auth.service';

interface Entreprise {
  id: number;
  nom: string;
  secteurActivite: string;
  adresse?: string;
  telephone?: string;
  siteWeb?: string;
  dateCreation?: Date;
}
interface Offre {
  id: number;
  nomEntreprise: string;
  secteurActivite: string;
  typeOffre: string;
  dureeMois?: number;
  posteTitre: string;
  description: string;
  localisation: string;
  dateDebut: string | Date;
  status: string;
  applications: number;
  recruteurId: number;
  entrepriseId: number;
}

@Component({
  selector: 'app-offres-recruteur',
  templateUrl: './offres-recruteur.component.html',
  standalone: true,
  styleUrls: ['./offres-recruteur.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class OffresRecruteurComponent implements OnInit {
  searchControl = new FormControl('');
  statusFilter = new FormControl('');
  dateFilter = new FormControl('');

  offres: Offre[] = [];
  filteredOffres: Offre[] = [];
  showOffreModal = false;
  isEditMode = false;
  currentOffre: Offre | null = null;
  offreForm!: FormGroup;
  currentUser: any;
  entrepriseInfo: any;
  typeOffreOptions = [
    { value: 'STAGE', label: 'Stage' },
    { value: 'PRE_EMBAUCHE', label: 'Pré-embauche' },
    { value: 'RECRUTEMENT', label: 'Recrutement' }
  ];
  secteurOptions = [
    'Informatique',
    'Télécommunications',
    'Banque & Finance',
    'Santé',
    'Industrie',
    'Commerce & Distribution',
    'Éducation',
    'Services',
    'Bâtiment & Construction',
    'Transport & Logistique',
    'Énergie',
    'Agriculture',
    'Tourisme & Hôtellerie',
    'Média & Communication',
    'Autre'
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.loadCurrentUser();
  }

  loadCurrentUser(): void {
    this.currentUser = this.authService.getCurrentUser();
    if (!this.currentUser) {
      this.router.navigate(['/login']);
    } else {
      this.loadEntrepriseInfo();
      this.loadOffres();
    }
  }

  loadEntrepriseInfo(): void {
    // Si l'utilisateur est un recruteur, on charge les informations de son entreprise
    if (this.currentUser && this.currentUser.role === 'RECRUTEUR') {
      this.http.get<Entreprise>(`/api/v1/recruteurs/${this.currentUser.id}/entreprise`).subscribe({
        next: (entreprise) => {
          this.entrepriseInfo = entreprise;
        },
        error: (err) => console.error('Erreur chargement entreprise:', err)
      });
    }
  }

  initializeForm(): void {
    this.offreForm = this.fb.group({
      nomEntreprise: ['', [Validators.required]],
      secteurActivite: ['', [Validators.required]],
      typeOffre: ['', [Validators.required]],
      dureeMois: [null],
      posteTitre: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(50)]],
      localisation: ['', [Validators.required]],
      dateDebut: ['', [Validators.required]],
      status: ['active']
    });
  }

  loadOffres(): void {
    this.http.get<Offre[]>(`/api/v1/offres/recruteur/${this.currentUser.id}`).subscribe({
      next: (offres) => {
        this.offres = offres;
        this.filteredOffres = [...offres];
      },
      error: (err) => console.error('Erreur chargement offres:', err)
    });
  }

  filterOffres(): void {
    let result = [...this.offres];

    if (this.statusFilter.value) {
      result = result.filter(offre => offre.status === this.statusFilter.value);
    }

    if (this.dateFilter.value === 'recent') {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      result = result.filter(offre => new Date(offre.dateDebut) >= thirtyDaysAgo);
    } else if (this.dateFilter.value === 'old') {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      result = result.filter(offre => new Date(offre.dateDebut) < thirtyDaysAgo);
    }

    if (this.searchControl.value) {
      const searchTerm = this.searchControl.value.toLowerCase();
      result = result.filter(offre =>
        offre.posteTitre.toLowerCase().includes(searchTerm) ||
        offre.description.toLowerCase().includes(searchTerm))
    }

    this.filteredOffres = result;
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'active': return 'Active';
      case 'draft': return 'Brouillon';
      case 'closed': return 'Clôturée';
      default: return status;
    }
  }

  closeOffre(offre: Offre): void {
    if (confirm('Voulez-vous vraiment clôturer cette offre ?')) {
      this.http.patch(`/api/v1/offres/${offre.id}/status`, { status: 'closed' }).subscribe({
        next: () => {
          offre.status = 'closed';
          this.filterOffres();
        },
        error: (err) => console.error('Erreur clôture offre:', err)
      });
    }
  }

  viewApplications(offre: Offre): void {
    this.router.navigate(['/recruteur/candidatures', offre.id]);
  }

  openEditModal(offre: Offre): void {
    this.isEditMode = true;
    this.currentOffre = offre;
    this.offreForm.patchValue({
      ...offre,
      dateDebut: this.formatDateForInput(offre.dateDebut)
    });
    this.showOffreModal = true;
  }

  openCreateModal(): void {
    this.isEditMode = false;
    this.currentOffre = null;
    this.offreForm.reset({
      nomEntreprise: this.entrepriseInfo?.nom || '',
      secteurActivite: this.entrepriseInfo?.secteurActivite || '',
      status: 'active'
    });
    this.showOffreModal = true;
  }

  closeModal(): void {
    this.showOffreModal = false;
  }

  saveOffre(): void {
    if (this.offreForm.invalid) return;

    // Ajouter datePublication si c'est une nouvelle offre
    const currentDate = new Date();
    const offreData = {
      ...this.offreForm.value,
      datePublication: currentDate,
      recruteurId: this.currentUser.id,
      entrepriseId: this.entrepriseInfo?.id
    };

    if (this.isEditMode && this.currentOffre) {
      this.http.put(`/api/v1/offres/${this.currentOffre.id}`, offreData).subscribe({
        next: (updatedOffre: any) => {
          const index = this.offres.findIndex(o => o.id === updatedOffre.id);
          if (index !== -1) {
            this.offres[index] = updatedOffre;
          }
          this.filterOffres();
          this.closeModal();
        },
        error: (err) => console.error('Erreur mise à jour offre:', err)
      });
    } else {
      this.http.post('/api/v1/offres', offreData).subscribe({
        next: (newOffre: any) => {
          this.offres.unshift(newOffre);
          this.filterOffres();
          this.closeModal();
        },
        error: (err) => console.error('Erreur création offre:', err)
      });
    }
  }

  private formatDateForInput(date: string | Date): string {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  }

  formatDate(date: string | Date): string {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }
}
