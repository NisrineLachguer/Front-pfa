import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {UserService} from '../../../core/user/user.service';

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
  userId: number | null = null;
  userData: any = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.profileForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.pattern(/^[0-9+\s-]{8,15}$/)]],
      adresse: ['']
    });
  }

  ngOnInit(): void {
    // Obtenir l'ID de l'utilisateur connecté
    this.userId = this.userService.getCurrentUserId();

    if (this.userId) {
      this.loadUserData(this.userId);
    } else {
      console.error('Aucun utilisateur connecté ou ID utilisateur non disponible');
    }
  }

  loadUserData(userId: number): void {
    this.userService.getCandidateById(userId).subscribe({
      next: (data) => {
        this.userData = data;
        this.profileForm.patchValue({
          username: data.username,
          email: data.email,
          telephone: data.telephone || '',
          adresse: data.adresse || ''
        });
        this.profileForm.disable(); // Désactiver le formulaire en mode consultation
      },
      error: (err) => {
        console.error('Erreur lors du chargement des données utilisateur:', err);
        this.saveError = true;
      }
    });
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

    if (!this.userId) {
      console.error('ID utilisateur non disponible');
      this.saveError = true;
      return;
    }

    // Préparer les données à envoyer
    const updatedData = {
      ...this.userData, // Garder les données existantes
      username: this.profileForm.value.username,
      email: this.profileForm.value.email,
      telephone: this.profileForm.value.telephone,
      adresse: this.profileForm.value.adresse
    };

    this.userService.updateCandidate(this.userId, updatedData).subscribe({
      next: (response) => {
        console.log('Profil mis à jour avec succès:', response);
        this.saveSuccess = true;
        this.saveError = false;
        this.isEditing = false;
        this.profileForm.disable();

        // Mettre à jour les données locales
        this.userData = response;
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour du profil:', err);
        this.saveError = true;
        this.saveSuccess = false;
      }
    });
  }

  cancel(): void {
    // Recharger les données originales depuis le serveur
    if (this.userId) {
      this.loadUserData(this.userId);
    }
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
    return username ? username.charAt(0).toUpperCase() : 'U';
  }
}
