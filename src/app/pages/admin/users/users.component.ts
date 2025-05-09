import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { DatePipe, CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';

export interface UserData {
  fullName: string;
  email: string;
  role: string;
  status: string;
  createdAt: Date;
  jobPosts: number;
  cvProcessed: number;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule, // Pour utiliser les directives comme *matCellDef et le pipe date
    MatIconModule
  ],
  providers: [DatePipe] // On fournit le DatePipe ici
})
export class UsersComponent {
  displayedColumns: string[] = ['fullName', 'email', 'role', 'status', 'createdAt', 'jobPosts', 'cvProcessed', 'actions'];

  usersData: UserData[] = [
    {
      fullName: 'khalil chaima',
      email: 'chaimaakhalil20@gmail.com',
      role: 'Admin',
      status: 'actif',
      createdAt: new Date('2025-01-04'),
      jobPosts: 0,
      cvProcessed: 0
    },
    {
      fullName: 'ouchan meriem',
      email: 'mariem.ouchan@03.com',
      role: 'Recruteur',
      status: 'désactivé',
      createdAt: new Date('2025-05-09'),
      jobPosts: 12,
      cvProcessed: 89
    },
    {
      fullName: 'mohammed-saad khalil',
      email: 'khalil@saad.com',
      role: 'Recruteur',
      status: 'actif',
      createdAt: new Date('2025-030-10'),
      jobPosts: 7,
      cvProcessed: 34
    }
  ];

  constructor(private datePipe: DatePipe) {}

  addUser() {
    console.log('Ajouter un utilisateur');
    // Implémenter la logique d'ajout (formulaire ou navigation)
  }

  editUser(user: UserData) {
    console.log('Modifier utilisateur :', user);
    // Implémenter la logique de modification
  }

  deleteUser(user: UserData) {
    const confirmDelete = confirm(`Voulez-vous vraiment supprimer ${user.fullName} ?`);
    if (confirmDelete) {
      this.usersData = this.usersData.filter(u => u !== user);
    }
  }
}
