import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  imports: [
    FormsModule
  ],
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  // Données de l'utilisateur
  user = {
    name: 'Chaimae',
    role: 'Candidat',
    username: 'chaimae',
    email: 'chaimaakhalil20@gmail.com',
    phone: '06523456789'
  };

  // Fonction pour sauvegarder les modifications
  saveChanges() {
    console.log('Modifications sauvegardées :', this.user);
    // Ici, tu peux appeler un service pour envoyer les données au backend
  }
}
