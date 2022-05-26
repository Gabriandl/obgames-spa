import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserGameComponent } from './views/browserGame/browserGame.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserGameDialogComponent } from './shared/browser-game-dialog/browser-game-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoriaComponent } from './views/categoria/categoria.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { CategoriaDialogComponent } from './shared/categoria-dialog/categoria-dialog.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HomeComponent } from './views/home/home.component';
import { AuthenticationComponent } from './views/authentication/authentication.component';
import { LoginComponent } from './account/login/login.component';
import { CreateAccountComponent } from './account/create-account/create-account.component';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import {MatTooltipModule} from '@angular/material/tooltip';

import { httpInterceptorProviders } from './http-interceptors';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { SafePipe } from './safe.pipe';
import { BrowserGameDetailComponent } from './views/browser-game-detail/browser-game-detail.component';
import { StarRatingComponent } from './shared/star-rating/star-rating.component';
import { ProfileComponent } from './views/profile/profile.component';
import { RecomendacaoComponent } from './views/recomendacao/recomendacao.component';
import { RelatorioComponent } from './views/relatorio/relatorio.component';
import { ResetPasswordComponent } from './account/reset-password/reset-password.component';

@NgModule({
  declarations: [
    AppComponent,
    SafePipe,
    BrowserGameComponent,
    HeaderComponent,
    FooterComponent,
    BrowserGameDialogComponent,
    CategoriaComponent,
    CategoriaDialogComponent,
    HomeComponent,
    AuthenticationComponent,
    LoginComponent,
    CreateAccountComponent,
    BrowserGameDetailComponent,
    StarRatingComponent,
    ProfileComponent,
    RecomendacaoComponent,
    RelatorioComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatToolbarModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatSnackBarModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    MatListModule,
    MatTooltipModule
    
  ],
  providers: [
    httpInterceptorProviders,
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
