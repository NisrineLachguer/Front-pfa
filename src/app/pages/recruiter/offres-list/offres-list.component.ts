import { Component, OnInit } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import { OffreService } from '../../../core/offre/offre.service';
import { AuthService } from '../../../auth/auth.service';
import {TruncatePipe} from '../../../shared/pipes/truncate.pipe';
import {CommonModule, DatePipe} from '@angular/common';

interface Offre {
  id: number;
  nomEntreprise: string;
  posteTitre: string;
  description: string;
  localisation: string;
  datePublication: string;
  status: string;
}

@Component({
  selector: 'app-offres-list',
  standalone: true,
  templateUrl: './offres-list.component.html',
  imports: [
    RouterOutlet,
    TruncatePipe,
    DatePipe,
    CommonModule
  ],
  styleUrls: ['./offres-list.component.css']
})
export class OffresListComponent implements OnInit {
  offres: Offre[] = [];
  isLoading = true;

  constructor(
    private router: Router,
    private offreService: OffreService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (!this.authService.hasRole('RECRUITER') && !this.authService.hasRole('CANDIDATE')) {
      this.router.navigate(['/unauthorized']);
      return;
    }
    this.loadOffres();
  }

  loadOffres(): void {
    this.isLoading = true;

    if (this.authService.hasRole('RECRUITER')) {
      this.loadRecruiterOffres();
    } else if (this.authService.hasRole('CANDIDATE')) {
      this.loadCandidateOffres();
    } else {
      this.isLoading = false;
      this.router.navigate(['/unauthorized']);
    }
  }

  loadRecruiterOffres(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser?.id) {
      this.offreService.getOffresByRecruteur(currentUser.id).subscribe({
        next: (offres) => {
          this.offres = offres;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Erreur:', err);
          this.isLoading = false;
        }
      });
    }
  }

  loadCandidateOffres(): void {
    this.offreService.getOffresForCandidat().subscribe({
      next: (offres) => {
        this.offres = offres;
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Erreur:', err);
        this.isLoading = false;
      }
    });
  }
  getStatusLabel(status: string): string {
    switch (status) {
      case 'active': return 'Active';
      case 'draft': return 'Brouillon';
      case 'closed': return 'Clôturée';
      default: return status;
    }
  }

  viewApplications(offreId: number): void {
    this.router.navigate(['/recruiter/candidatures', offreId]);
  }

  editOffre(offreId: number): void {
    this.router.navigate(['/recruiter/offres/edit', offreId]);
  }

  openCreateModal() {
    this.router.navigate(['/recruiter/offres/nouvelle']);
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'active': return 'status-active';
      case 'draft': return 'status-draft';
      case 'closed': return 'status-closed';
      default: return '';
    }
  }
}
