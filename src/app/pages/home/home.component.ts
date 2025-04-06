import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {FeatureSectionComponent} from "../../shared/components/feature-section/feature-section.component";
import {RouterLink, RouterLinkActive} from '@angular/router';
import {AuthService} from '../../auth/auth.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FeatureSectionComponent, RouterLink, RouterLinkActive],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  features = [
    {
      icon: 'adjust',
      title: 'Adjust Payroll',
      description: 'Create your quotes and mark them as accepted or declined'
    },
    {
      icon: 'review',
      title: 'Review & Confirm',
      description: 'Automate enrollment through employee profile sync'
    },
    {
      icon: 'payment',
      title: 'Payment',
      description: 'Round the clock access, no matter where your people are'
    },
    {
      icon: 'submission',
      title: 'Submission',
      description: 'Coverage that suits your budget and needs in just a few clicks'
    }
  ];

  isMobileMenuOpen = false;
  constructor(public authService: AuthService) {}
  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}

