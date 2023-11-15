import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { RegisterComponent } from '../components/register/register.component';
import { LoginComponent } from '../components/login/login.component';
import { HomeComponent } from '../components/home/home.component';
import { CatalogComponent } from '../components/catalog/catalog.component';
import { FilmViewComponent } from '../components/film-view/film-view.component';
import { AddFilmComponent } from '../components/add-film/add-film.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'catalog',
    component: CatalogComponent
  },
  {
    path: 'view/:id',
    component: FilmViewComponent
  },
  {
    path: 'add',
    component: AddFilmComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
