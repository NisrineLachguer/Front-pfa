import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent implements OnInit {
  profileForm: FormGroup;
  isEditing = false;
  saveSuccess = false;
  saveError = false;

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.pattern(/^[0-9+\s-]{8,15}$/)]],
      adresse: ['']
    });
  }

  ngOnInit(): void {
    // Simuler le chargement des données utilisateur depuis un service
    this.loadUserData();
  }

  loadUserData(): void {
    // Simulation de données utilisateur (à remplacer par un appel API réel)
    const userData = {
      username: 'JohnDoe',
      email: 'john.doe@example.com',
      telephone: '0612345678',
      adresse: '123 Rue Principale, 75000 Paris'
    };

    this.profileForm.patchValue(userData);
    this.profileForm.disable(); // Désactiver le formulaire en mode consultation
  }

  toggleEdit(): void {
    if (this.isEditing) {
      this.profileForm.disable();
    } else {
      this.profileForm.enable();
    }
    this.isEditing = !this.isEditing;
    this.saveSuccess = false;
    this.saveError = false;
  }

  saveProfile(): void {
    if (this.profileForm.invalid) {
      this.markFormGroupTouched(this.profileForm);
      return;
    }

    // Simulation de la sauvegarde (à remplacer par un appel API réel)
    console.log('Données à sauvegarder:', this.profileForm.value);

    // Simuler un délai de traitement
    setTimeout(() => {
      // Simuler un succès (dans un cas réel, cela dépendrait de la réponse de l'API)
      this.saveSuccess = true;
      this.saveError = false;
      this.isEditing = false;
      this.profileForm.disable();
    }, 1000);
  }

  cancel(): void {
    // Recharger les données originales
    this.loadUserData();
    this.isEditing = false;
    this.saveSuccess = false;
    this.saveError = false;
  }

  // Aide à la validation - marque tous les champs comme touchés pour afficher les erreurs
  markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if ((control as any).controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }

  get usernameFirstLetter(): string {
    const username = this.profileForm.get('username')?.value;
    return username ? username.charAt(0) : 'U';
  }

}
