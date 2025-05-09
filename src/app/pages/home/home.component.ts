import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FeatureSectionComponent } from "../../shared/components/feature-section/feature-section.component";
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FeatureSectionComponent, RouterLink, RouterLinkActive],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  services = [
    {
      title: 'Recherche intelligente',
      description: 'Notre algorithme de matching analyse votre profil et vos compétences pour vous proposer les offres les plus pertinentes.',
      iconClass: 'fas fa-search fa-2x', // Icône de recherche
      gradient: 'blue'
    },
    {
      title: 'CV optimisé',
      description: 'Créez un CV professionnel et optimisé pour maximiser vos chances de décrocher l\'emploi de vos rêves.',
      iconClass: 'fas fa-file-alt fa-2x', // Icône de document/CV
      gradient: 'purple'
    },
    {
      title: 'Communication directe',
      description: 'Échangez directement avec les recruteurs ou les candidats via notre messagerie intégrée sécurisée.',
      iconClass: 'fas fa-comments fa-2x', // Icône de messages
      gradient: 'pink'
    }
  ];

  steps = [
    {
      step: 1,
      title: 'Créez votre compte',
      description: 'Inscription rapide et facile en quelques clics'
    },
    {
      step: 2,
      title: 'Complétez votre profil',
      description: 'Ajoutez vos compétences, expériences et préférences d\'emploi'
    },
    {
      step: 3,
      title: 'Explorez les offres',
      description: 'Parcourez les opportunités qui correspondent à votre profil'
    },
    {
      step: 4,
      title: 'Postulez en un clic',
      description: 'Envoyez votre candidature et suivez son évolution'
    }
  ];

  features = [
    {
      icon: 'search',
      title: 'Recherche d\'emploi',
      description: 'Trouvez l\'emploi qui correspond à vos compétences et aspirations'
    },
    {
      icon: 'business',
      title: 'Recrutement',
      description: 'Publiez vos offres et trouvez les meilleurs talents pour votre entreprise'
    },
    {
      icon: 'document',
      title: 'CV & Profil',
      description: 'Créez un CV professionnel et attirez l\'attention des recruteurs'
    },
    {
      icon: 'alert',
      title: 'Alertes emploi',
      description: 'Recevez des notifications pour les offres qui correspondent à votre profil'
    }
  ];

  testimonials = [
    {
      name: 'Sophie Martin',
      position: 'Développeuse Web',
      message: 'WorkSpot m\'a permis de trouver un emploi qui correspond parfaitement à mes compétences et à mes attentes. Le processus était simple et efficace!'
    },
    {
      name: 'Thomas Dubois',
      position: 'Directeur RH',
      message: 'En tant que recruteur, WorkSpot nous a aidé à identifier rapidement les meilleurs talents pour notre entreprise. Un gain de temps considérable!'
    },
    {
      name: 'Marie Leclerc',
      position: 'Graphiste',
      message: 'J\'ai pu mettre en valeur mon portfolio et mes compétences. En moins d\'un mois, j\'ai reçu plusieurs offres intéressantes!'
    },
    {
      name: 'Alexandre Petit',
      position: 'Ingénieur logiciel',
      message: 'Interface simple, recherche efficace et notifications pertinentes. WorkSpot est devenu mon outil de référence pour la recherche d\'emploi.'
    }
  ];

  isMobileMenuOpen = false;
  isNavbarScrolled = false;

  constructor(public authService: AuthService) {}

  ngOnInit() {
    // Initialization logic
    this.handleScroll();
  }

  ngAfterViewInit() {
    // Start animations after view is initialized
    this.initCounters();
    this.startAutoSlideTestimonials();
    this.initScrollReveal();
  }

  @HostListener('window:scroll', [])
  handleScroll() {
    this.isNavbarScrolled = window.scrollY > 50;

    // Add 'scrolled' class to navbar when scrolled
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    // Prevent body scroll when mobile menu is open
    if (this.isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }

  private initCounters() {
    const counters = document.querySelectorAll('.counter');

    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target') || '0');
      const duration = 2000; // Animation duration in milliseconds
      const step = Math.ceil(target / (duration / 16)); // 60fps

      let current = 0;
      const updateCounter = () => {
        current += step;
        if (current < target) {
          counter.textContent = current.toString();
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target.toString();
        }
      };

      // Start counter animation when element is in viewport
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            updateCounter();
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });

      observer.observe(counter);
    });
  }

  private startAutoSlideTestimonials() {
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider) {
      let scrollAmount = 0;
      const cardWidth = 380 + 32; // Card width + gap
      const maxScroll = testimonialSlider.scrollWidth - testimonialSlider.clientWidth;

      setInterval(() => {
        scrollAmount += cardWidth;
        if (scrollAmount > maxScroll) {
          scrollAmount = 0;
        }
        testimonialSlider.scrollTo({
          left: scrollAmount,
          behavior: 'smooth'
        });
      }, 5000);
    }
  }

  private initScrollReveal() {
    const fadeElements = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    fadeElements.forEach(element => {
      observer.observe(element);
    });
  }
}
