import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAccountComponent } from './account/create-account/create-account.component';
import { LoginComponent } from './account/login/login.component';
import { ResetPasswordComponent } from './account/reset-password/reset-password.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './services/auth.guard';
import { AuthenticationComponent } from './views/authentication/authentication.component';
import { BrowserGameDetailComponent } from './views/browser-game-detail/browser-game-detail.component';
import { BrowserGameComponent } from './views/browserGame/browserGame.component';
import { CategoriaComponent } from './views/categoria/categoria.component';
import { HomeComponent } from './views/home/home.component';
import { ProfileComponent } from './views/profile/profile.component';
import { RelatorioComponent } from './views/relatorio/relatorio.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'home', component: HomeComponent }
      
    ],
    canActivate: [AuthGuard]
  },
  { 
    path: 'profile', 
    component: ProfileComponent,
    canActivate: [AuthGuard] 
  },
  { 
    path: 'relatorio', 
    component: RelatorioComponent,
    canActivate: [AuthGuard] 
  },
  { 
    path: 'browserGame', 
    component: BrowserGameComponent,
    canActivate: [AuthGuard] 
  },
  { 
    path: 'categoria', 
    component: CategoriaComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'reset-password', 
    component: ResetPasswordComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'browserGame/:id', 
    component: BrowserGameDetailComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: '',
    component: AuthenticationComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'create-account', component: CreateAccountComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
