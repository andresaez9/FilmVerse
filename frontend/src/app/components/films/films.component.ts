import { Component } from '@angular/core';
import { Film } from 'src/app/interfaces/film.interface';
import { FilmService } from 'src/app/services/film.service';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.scss']
})
export class FilmsComponent {
    films: Film[] = [];
    filmsCategory: Film[] = [];
    selectedGenre: number = 0;
    

    constructor(private film: FilmService) { }

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
