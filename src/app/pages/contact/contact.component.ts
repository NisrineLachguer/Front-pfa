import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  nom: string = '';
  email: string = '';
  message: string = '';

  onSubmit() {
    // Logique d'envoi du formulaire
    console.log('Formulaire soumis', this.nom, this.email, this.message);
  }
}
