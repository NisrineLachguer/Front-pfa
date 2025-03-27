import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { LandingComponent } from './landing/landing.component';
import { AdminComponent } from './pages/admin/admin.component';
import { RecruiterComponent } from './pages/recruiter/recruiter.component';
import { CandidateComponent } from './pages/candidate/candidate.component';
import { authGuard } from './core/auth.guard';
import {HomeComponent} from './pages/home/home.component';
import {ContactComponent} from './pages/contact/contact.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },

  {
    path: 'login',
    component: LoginComponent,
    title: 'Connexion'
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'sign-up '
  },

  { path: 'contact', component: ContactComponent },

  {
    path: 'admin',
    component: AdminComponent,
    title: 'Admin',
    canActivate: [authGuard],
    data: { role: 'ADMIN' }
  },
  {
    path: 'recruiter',
    component: RecruiterComponent,
    title: 'Recruteur',
    canActivate: [authGuard],
    data: { role: 'RECRUITER' }
  },
  {
    path: 'candidate',
    component: CandidateComponent,
    title: 'Candidat',
    canActivate: [authGuard],
    data: { role: 'CANDIDATE' }
  },
  {
    path: '**',
    redirectTo: ''
  }
];
