import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { CandidatureAnalysis} from '../../../shared/model/condidature/candidature-analysis.model';

@Component({
  selector: 'app-application-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.css']
})
export class ApplicationFormComponent implements OnInit {
  applicationForm!: FormGroup;
  isSubmitting = false;
  submitted = false;
  success = false;
  offreId: number | null = null;
  analysis: CandidatureAnalysis | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Récupérer l'ID de l'offre depuis l'URL
    this.route.params.subscribe(params => {
      this.offreId = params['id'] ? Number(params['id']) : null;
      console.log('ID de l\'offre récupéré :', this.offreId);

      // Vérifier si l'offreId est valide
      if (!this.offreId || isNaN(this.offreId)) {
        console.error('Erreur: offreId invalide ou non défini', this.offreId);
      }
      this.initForm();
    });
  }

  initForm(): void {
    console.log('Initialisation du formulaire avec offreId:', this.offreId);
    this.applicationForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.pattern(/^[0-9]{10}$/)]],
      experience: [''],
      formation: [''],
      competences: [''],
      motivation: [''],
      disponibilite: [''],
      offreId: [this.offreId,  Validators.required]
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.applicationForm.get(fieldName);
    return !!field && field.invalid && (field.dirty || field.touched);
  }

  resetForm(): void {
    this.applicationForm.reset();
    this.submitted = false;
    this.analysis = null;
  }

  onSubmit(): void {
    if (this.applicationForm.invalid) {
      // Marquer tous les champs comme touchés pour afficher les erreurs
      Object.keys(this.applicationForm.controls).forEach(key => {
        const control = this.applicationForm.get(key);
        control?.markAsTouched();
      });
      return;
    }

    this.isSubmitting = true;
    this.submitted = true;
    const formData = this.applicationForm.value;

    // Vérifier explicitement si offreId est présent et valide
    if (!formData.offreId || isNaN(formData.offreId)) {
      console.error('ERREUR: offreId invalide ou manquant', formData.offreId);
      this.isSubmitting = false;
      this.success = false;
      alert('Erreur: ID de l\'offre invalide. Veuillez réessayer ou contacter le support.');
      return;
    }

    console.log('Données du formulaire à envoyer:', JSON.stringify(formData));

   /* this.http.post('http://localhost:8080/api/candidature/apply', formData, {
      //headers: { 'Content-Type': 'application/json' }
      //responseType: 'text'
    })
      .pipe(finalize(() => this.isSubmitting = false))
      .subscribe({
        next: (response) => {
          console.log('Réponse du serveur:', response);
          this.success = true;

          //Traiter l'analyse si elle est présente
          if (response.analysis) {
            this.analysis = response.analysis;
          }
        },*/
    this.http.post('http://localhost:8080/api/candidature/apply', formData)
      .pipe(finalize(() => this.isSubmitting = false))
      .subscribe({
        next: (response: any) => {
          console.log('Réponse du serveur:', response);
          this.success = true;

          // Traiter l'analyse si elle est présente
          if (response.analysis) {
            this.analysis = response.analysis;
          }
        },
        error: (error) => {
          this.success = false;
          console.error('Erreur lors de l\'envoi du formulaire:', error);
          let errorMessage = 'Erreur inconnue';
          if (error.error && typeof error.error === 'string') {
            errorMessage = error.error;
          } else if (error.message) {
            errorMessage = error.message;
          }

          console.error('Détails de l\'erreur:', errorMessage);
          alert('Erreur lors de l\'envoi: ' + errorMessage);
        }
      });
  }
}
