import { Component } from '@angular/core';
import { Film } from 'src/app/interfaces/film.interface';
import { AuthService } from 'src/app/services/auth.service';
import { FilmService } from 'src/app/services/film.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent {
    films: Film[] = [];
    filmsCategory: Film[] = [];
    currentPage: number = 1;
    elementsPerPage: number = 14;
    selectedGenre: number = 0;
    isAdmin: boolean = false;
    

    constructor(private film: FilmService, private auth: AuthService) {
      this.isAdmin = this.auth.isAdmin();    
    }

    ngOnInit(): void {
      this.getFilms()
      this.getByIdCategory()
    }

    getFilms(): void {
      this.film.getAllFilms()
        .subscribe((films) => {
          this.films = films    
      });
    }

    getByIdCategory(): void {
      this.film.getByCategory(this.selectedGenre)
        .subscribe((films) => {
          this.filmsCategory = films
      });
    }



}
