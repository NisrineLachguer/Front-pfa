import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { OffreService } from '../../../core/offre/offre.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../auth/auth.service';


@Component({
  selector: 'app-create-offre',
  standalone: true,
  templateUrl: './create-offre.component.html',
  styleUrls: ['./create-offre.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class CreateOffreComponent {
  private fb = inject(FormBuilder);
  private offreService = inject(OffreService);
  private router = inject(Router);

  offreForm = this.fb.group({
    nomEntreprise: ['', Validators.required],
    secteurActivite: ['', Validators.required],
    typeOffre: ['', Validators.required],
    dureeMois: [null],
    posteTitre: ['', Validators.required],
    description: ['', [Validators.required, Validators.minLength(50)]],
    localisation: ['', Validators.required],
    dateDebut: ['', Validators.required],
    status: ['active'] // Ajouté pour correspondre à votre modèle
  });

  secteurOptions = [
    'Informatique', 'Télécommunications', 'Banque & Finance',
    'Santé', 'Industrie', 'Commerce & Distribution'
  ];

  typeOffreOptions = [
    { value: 'STAGE', label: 'Stage' },
    { value: 'PRE_EMBAUCHE', label: 'Pré-embauche' },
    { value: 'RECRUTEMENT', label: 'Recrutement' }
  ];

  onSubmit() {
    if (this.offreForm.valid) {
      const offreData = {
        ...this.offreForm.value,
        datePublication: new Date().toISOString(), // Format ISO pour Java
        recruteurId: this.getCurrentUserId() // Doit correspondre au champ dans OffreDto
      };

      this.offreService.createOffre(offreData).subscribe({
        next: () => {
          this.router.navigate(['/recruiter/offres']);
        },
        error: (err) => console.error('Erreur création offre:', err)
      });
    }
  }

  onCancel() {
    this.router.navigate(['/recruiter/offres']);
  }
  private authService = inject(AuthService);

  getCurrentUserId(): number {
    const user = this.authService.getCurrentUser();
    if (!user) {
      throw new Error('Aucun utilisateur connecté');
    }

    if (user.id === undefined || user.id === null) {
      throw new Error('ID utilisateur manquant dans le token');
    }

    return user.id;
  }
}
