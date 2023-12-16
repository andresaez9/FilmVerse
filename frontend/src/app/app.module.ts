import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './routes/app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { TypeUser } from './pipes/type-user.pipe';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { CardComponent } from './components/card/card.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilmViewComponent } from './components/film-view/film-view.component';
import { AddFilmComponent } from './components/add-film/add-film.component';
import { UpdateFilmComponent } from './components/update-film/update-film.component';
import { StreamComponent } from './components/stream/stream.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserListComponent } from './components/user-list/user-list.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    RegisterComponent,
    LoginComponent,
    TypeUser,
    HomeComponent,
    CardComponent,
    CatalogComponent,
    FilmViewComponent,
    AddFilmComponent,
    UpdateFilmComponent,
    StreamComponent,
    ProfileComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
