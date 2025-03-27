import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar">
      <div class="navbar-container">
        <div class="logo">
          <a routerLink="/">
            <h1>WorkSpot</h1>
          </a>
        </div>
        <div class="menu-toggle" (click)="toggleMobileMenu()">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul class="nav-links" [class.active]="isMobileMenuOpen">
          <li><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">Accueil</a></li>
          <li><a routerLink="/contact" routerLinkActive="active">Contact</a></li>
          <li><a routerLink="/login" routerLinkActive="active" class="signin-btn">Connexion</a></li>
        </ul>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      background-color: #ffffff;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      z-index: 1000;
    }
    h1 {
      color: #2d3748;
      font-size: 1.5rem;
      text-align: center;
      font-weight: 700;
      position: relative;
      padding-bottom: 15px;
    }

    h1::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 100px;
      height: 4px;
      background: linear-gradient(to right, #6b46c1, #4299e1);
      border-radius: 2px;
    }

    .navbar-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: 1200px;
      margin: 0 auto;
      padding: 15px 20px;
    }

    .logo .logo-image {
      height: 40px;
    }

    .nav-links {
      display: flex;
      align-items: center;
      list-style: none;
      gap: 20px;
    }

    .nav-links li a {
      text-decoration: none;
      color: #333;
      font-weight: 500;
      transition: color 0.3s ease;
      position: relative;
    }

    .nav-links li a:hover,
    .nav-links li a.active {
      color: #6b46c1;
    }

    .nav-links li a::after {
      content: '';
      position: absolute;
      width: 0;
      height: 2px;
      bottom: -5px;
      left: 0;
      background-color: #6b46c1;
      transition: width 0.3s ease;
    }

    .nav-links li a:hover::after,
    .nav-links li a.active::after {
      width: 100%;
    }

    .signin-btn {
      background-color: #6b46c1;
      color: white !important;
      padding: 8px 15px;
      border-radius: 20px;
      transition: background-color 0.3s ease;
    }

    .signin-btn:hover {
      background-color: #5a3592;
    }

    .menu-toggle {
      display: none;
      flex-direction: column;
      cursor: pointer;
    }

    .menu-toggle span {
      height: 3px;
      width: 25px;
      background-color: #333;
      margin: 3px 0;
      transition: 0.4s;
    }

    @media (max-width: 768px) {
      .menu-toggle {
        display: flex;
      }

      .nav-links {
        display: none;
        flex-direction: column;
        position: absolute;
        top: 70px;
        left: 0;
        width: 100%;
        background-color: white;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        padding: 20px;
      }

      .nav-links.active {
        display: flex;
      }
    }
  `]
})
export class NavbarComponent {
  isMobileMenuOpen = false;

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
