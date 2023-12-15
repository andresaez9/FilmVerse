import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { RegisterComponent } from '../components/register/register.component';
import { LoginComponent } from '../components/login/login.component';
import { HomeComponent } from '../components/home/home.component';
import { CatalogComponent } from '../components/catalog/catalog.component';
import { FilmViewComponent } from '../components/film-view/film-view.component';
import { AddFilmComponent } from '../components/add-film/add-film.component';
import { AuthGuard } from '../guards/auth.guard';
import { UpdateFilmComponent } from '../components/update-film/update-film.component';
import { StreamComponent } from '../components/stream/stream.component';
import { ProfileComponent } from '../components/profile/profile.component';

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
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'catalog',
    component: CatalogComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'view/:id',
    component: FilmViewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add',
    component: AddFilmComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit/:id',
    component: UpdateFilmComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'stream/:id',
    component: StreamComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
