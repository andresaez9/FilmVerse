import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Film } from 'src/app/interfaces/film.interface';
import { FilmService } from 'src/app/services/film.service';

@Component({
  selector: 'app-film-view',
  templateUrl: './film-view.component.html',
  styleUrls: ['./film-view.component.scss']
})
export class FilmViewComponent {

  movie: Film = { id_film: 0, title: '', description: '', director: '', year: 0, image: '', duration: 0, score: 0, id_category: 0, id_torrent: 0 };

  constructor(private route: ActivatedRoute, private film: FilmService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const filmID = parseInt(params.get('id')!);

      this.film.getFilmById(filmID).subscribe(
        res => {
          this.movie = res;
        },
        error => {
          console.error('Error getting film', error);
        });
    });
  }


}
