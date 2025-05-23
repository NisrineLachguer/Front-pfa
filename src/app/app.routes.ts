import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AdminComponent } from './pages/admin/admin.component';
import { RecruiterComponent } from './pages/recruiter/recruiter.component';
import { CandidateComponent } from './pages/candidate/candidate.component';
import { authGuard } from './core/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { OffresComponent } from './pages/candidate/offres/offres.component';
import { CandidaturesComponent } from './pages/candidate/candidatures/candidatures.component';
import { ProfilComponent } from './pages/candidate/profil/profil.component';
import { ApplicationFormComponent } from './pages/candidate/application-form/application-form.component';
import { CreateOffreComponent } from './pages/recruiter/create-offre/create-offre.component';
import { OffresListComponent } from './pages/recruiter/offres-list/offres-list.component';
import { CandidaturesRecuesComponent } from './pages/recruiter/candidatures-recues/candidatures-recues.component';
import { MatFormFieldModule } from '@angular/material/form-field';

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
    data: { role: 'ADMIN' },
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadComponent: () => import('./pages/admin/dashboard/dashboard.component').then(c => c.DashboardComponent) },
      { path: 'users', loadComponent: () => import('./pages/admin/users/users.component').then(c => c.UsersComponent) },
      { path: 'jobs', loadComponent: () => import('./pages/admin/jobs/jobs.component').then(c => c.JobsComponent) },
      { path: 'applications', loadComponent: () => import('./pages/admin/applications/applications.component').then(c => c.ApplicationsComponent) },
      { path: 'profile', loadComponent: () => import('./pages/admin/profile/profile.component').then(c => c.ProfileComponent) },
    ]
  },
  {
    path: 'recruiter',
    component: RecruiterComponent,
    title: 'Recruteur',
    canActivate: [authGuard],
    data: { role: 'RECRUITER' },
    children: [
      { path: 'offres', component: OffresListComponent },
      { path: 'offres/nouvelle', component: CreateOffreComponent },
      { path: 'candidatures', component: CandidaturesRecuesComponent }
    ]
  },
  {
    path: 'candidate',
    component: CandidateComponent,
    title: 'Candidat',
    canActivate: [authGuard],
    data: { role: 'CANDIDATE' },
    children: [
      {
        path: 'offres',
        component: OffresComponent
      },
      {
        path: 'candidatures',
        component: CandidaturesComponent
      },
      {
        path: 'profil',
        component: ProfilComponent
      }
    ]
  },
  {
    path: 'candidates/apply/test',
    loadComponent: () =>
      import('./pages/candidate/application-form/application-form.component')
        .then(c => c.ApplicationFormComponent)
  },
  {
    path: 'formulaire-candidature',
    component: ApplicationFormComponent
  },
  {
    path: 'formulaire-candidature/:id',
    component: ApplicationFormComponent
  },
  {
    path: 'offers/:id/candidature',
    component: ApplicationFormComponent
  },

  {
    path: '**',
    redirectTo: ''
  }
];
