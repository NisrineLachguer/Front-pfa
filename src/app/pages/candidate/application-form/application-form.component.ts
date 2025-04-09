import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs/operators';

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

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.applicationForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.pattern(/^[0-9]{10}$/)]],
      experience: [''],
      formation: [''],
      competences: [''],
      motivation: [''],
      disponibilite: ['']
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.applicationForm.get(fieldName);
    return !!field && field.invalid && (field.dirty || field.touched);
  }

  resetForm(): void {
    this.applicationForm.reset();
    this.submitted = false;
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

    this.http.post('http://localhost:8080/api/candidature/apply', formData)
      .pipe(
        finalize(() => {
          this.isSubmitting = false;
        })
      )
      .subscribe({
        next: () => {
          this.success = true;
          // Optionnel: reset form après succès
          // this.resetForm();
        },
        error: (error) => {
          this.success = false;
          console.error('Erreur lors de l\'envoi du formulaire:', error);
        }
      });
  }
}
