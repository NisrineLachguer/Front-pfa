import { Component, OnInit } from '@angular/core';
import { CandidatureService } from '../../../core/candidature-recue/candidature.service';
import { AuthService } from '../../../auth/auth.service';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { TruncatePipe } from '../../../shared/pipes/truncate.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-candidatures-recues',
  templateUrl: './candidatures-recues.component.html',
  standalone: true,
  imports: [CommonModule, DatePipe, TruncatePipe],
  styleUrls: ['./candidatures-recues.component.css']
})
export class CandidaturesRecuesComponent implements OnInit {
  candidatures: any[] = [];
  isLoading: boolean = false;
  recruteurId: number | null = null;
  isModalOpen: boolean = false;
  selectedCandidature: any = null;


  constructor(
    private candidatureService: CandidatureService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCandidatures();
  }

  viewDetails(candidature: any): void {
    this.selectedCandidature = candidature;
    this.isModalOpen = true;
    document.body.style.overflow = 'hidden'; // Empêche le défilement de la page en arrière-plan
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedCandidature = null;
    document.body.style.overflow = 'auto'; // Rétablit le défilement
  }

  loadCandidatures(): void {
    this.isLoading = true;
    this.recruteurId = this.authService.getCurrentUser()?.id || null;
    if (this.recruteurId) {
      this.candidatureService.getCandidaturesByRecruteur(this.recruteurId).subscribe({
        next: (data) => {
          this.candidatures = data;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Erreur lors du chargement des candidatures', err);
          this.isLoading = false;
        }
      });
    }
  }

  getStatusClass(statut: string): string {
    if (!statut) return 'status-en_attente';

    switch (statut.toLowerCase()) {
      case 'accepté':
      case 'accepte':
        return 'status-accepte';
      case 'refusé':
      case 'refuse':
        return 'status-refuse';
      default:
        return 'status-en_attente';
    }
  }

  downloadCv(candidatureId: number): void {
    this.candidatureService.downloadCv(candidatureId).subscribe({
      next: (blob: Blob) => {
        if (blob.size === 0) {
          console.error('Le PDF reçu est vide');
          return;
        }

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `CV_Candidature_${candidatureId}.pdf`;
        document.body.appendChild(a);
        a.click();

        setTimeout(() => {
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        }, 100);
      },
      error: (err) => {
        console.error('Erreur lors du téléchargement du CV', err);
      }
    });
  }

  updateStatus(candidatureId: number, newStatus: string): void {
    this.candidatureService.updateStatus(candidatureId, newStatus).subscribe({
      next: () => {
        // Mettre à jour le statut localement
        const candidature = this.candidatures.find(c => c.id === candidatureId);
        if (candidature) {
          candidature.statut = newStatus;
        }
        if (this.selectedCandidature?.id === candidatureId) {
          this.selectedCandidature.statut = newStatus;
        }
        // Optionnel : Afficher un message de succès
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour du statut', err);
        // Optionnel : Afficher un message d'erreur
      }
    });
  }
}
