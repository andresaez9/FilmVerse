import { Component } from '@angular/core';
import { Observable, Subscription, catchError, map, pipe } from 'rxjs';
import { Film } from 'src/app/interfaces/film.interface';
import { AuthService } from 'src/app/services/auth.service';
import { FilmService } from 'src/app/services/film.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  films: Film[] = [];

  constructor(private film: FilmService) { }

  ngOnInit(): void {
    this.randomFilms();
  }

  randomFilms(): void {
    this.film.getRandFilms().subscribe((films) => {
      this.films = films;
    });
  }
  
  handlerError(err: any): any {
    throw new Error('Method not implemented.');
  }

}

