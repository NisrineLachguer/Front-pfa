import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Offre {
  id: number;
  title: string;
  company: string;
  description: string;
  location: string;
  postedDate: string;
  salary?: string;
  type: string;
  logo?: string;
}

@Component({
  selector: 'app-offres',
  templateUrl: './offres.component.html',
  standalone: true,
  styleUrls: ['./offres.component.css'],
  imports: [CommonModule]
})
export class OffresComponent implements OnInit {
  offres: Offre[] = [
    {
      id: 1,
      title: 'Développeur Frontend Angular',
      company: 'TechNova',
      description: 'Créer des interfaces web modernes et dynamiques avec Angular et TypeScript. Expérience minimale de 2 ans requise.',
      location: 'Casablanca',
      postedDate: '2025-03-12',
      salary: '12 000 - 16 000 MAD',
      type: 'CDI'
    },
    {
      id: 2,
      title: 'Data Scientist',
      company: 'SmartData',
      description: 'Analyser les données pour aider à la prise de décision. Compétences en Python, R et ML requises.',
      location: 'Rabat',
      postedDate: '2025-03-15',
      salary: '15 000 - 20 000 MAD',
      type: 'CDI'
    },
    {
      id: 3,
      title: 'Développeur Full-Stack',
      company: 'WebSolution',
      description: 'Développement d\'applications web complètes utilisant React et Node.js. Connaissance de MongoDB appréciée.',
      location: 'Tanger',
      postedDate: '2025-03-18',
      type: 'Freelance'
    },
    {
      id: 4,
      title: 'UX/UI Designer',
      company: 'CreativeTech',
      description: 'Concevoir des interfaces utilisateur intuitives et esthétiques. Maîtrise de Figma et Adobe XD requise.',
      location: 'Casablanca',
      postedDate: '2025-03-20',
      salary: '10 000 - 14 000 MAD',
      type: 'CDI'
    },
    {
      id: 5,
      title: 'DevOps Engineer',
      company: 'CloudMasters',
      description: 'Mettre en place et gérer l\'infrastructure cloud. Expérience avec AWS, Docker et Kubernetes nécessaire.',
      location: 'Marrakech',
      postedDate: '2025-03-22',
      salary: '18 000 - 22 000 MAD',
      type: 'CDI'
    },
    {
      id: 6,
      title: 'Mobile Developer (Flutter)',
      company: 'AppGenius',
      description: 'Développer des applications mobiles cross-platform avec Flutter. Connaissance de Dart et du développement mobile requise.',
      location: 'Rabat',
      postedDate: '2025-03-25',
      type: 'CDD - 6 mois'
    }
  ];

  filteredOffres: Offre[] = [];
  searchTerm: string = '';
  selectedLocation: string = '';
  selectedSector: string = '';

  showApplyModal: boolean = false;
  currentOffre: Offre | null = null;

  constructor() {}

  ngOnInit(): void {
    // Initialiser les offres filtrées avec toutes les offres
    this.filteredOffres = [...this.offres];
    console.log('Offres chargées:', this.offres.length);
  }

  // Méthodes pour filtrer les offres (à implémenter plus tard)
  filterOffres(): void {
    // Cette méthode sera utilisée pour filtrer les offres selon les critères
    this.filteredOffres = this.offres.filter(offre => {
      const matchesSearch = this.searchTerm ?
        offre.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        offre.description.toLowerCase().includes(this.searchTerm.toLowerCase()) :
        true;

      const matchesLocation = this.selectedLocation ?
        offre.location === this.selectedLocation :
        true;

      // Ajoutez d'autres critères de filtrage selon vos besoins

      return matchesSearch && matchesLocation;
    });
  }

  // Formater la date au format plus lisible
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  // Nouvelles méthodes pour le modal
  openApplyModal(offre: Offre): void {
    this.currentOffre = offre;
    this.showApplyModal = true;
  }

  closeModal(): void {
    this.showApplyModal = false;
    this.currentOffre = null;
  }


  selectApplyMethod(method: 'form' | 'upload'): void {
    console.log(`Méthode de candidature sélectionnée: ${method}`);
    console.log(`Candidature pour le poste: ${this.currentOffre?.title}`);
    // Ici, vous pouvez ajouter la logique pour chaque méthode de candidature

    // Pour l'instant, fermons simplement le modal
    this.closeModal();
  }
}
