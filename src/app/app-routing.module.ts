import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserGameComponent } from './views/browserGame/browserGame.component';
import { CategoriaComponent } from './views/categoria/categoria.component';

const routes: Routes = [
  { path:'', component: BrowserGameComponent },
  { path: 'browserGame', component: BrowserGameComponent },
  { path: 'categoria', component: CategoriaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
