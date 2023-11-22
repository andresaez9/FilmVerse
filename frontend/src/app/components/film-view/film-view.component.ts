import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CategoryResponse } from 'src/app/interfaces/category.interface';
import { Film } from 'src/app/interfaces/film.interface';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { FilmService } from 'src/app/services/film.service';

declare const bootstrap: any;
@Component({
  selector: 'app-film-view',
  templateUrl: './film-view.component.html',
  styleUrls: ['./film-view.component.scss']
})
export class FilmViewComponent {

  @ViewChild('deleteFilmModal') deleteFilmModal!: ElementRef;
  private _movie: Film = { id_film: 0, title: '', description: '', director: '', year: 0, image: '', duration: 0, score: 0, id_category: 0, id_torrent: 0 };
  private _categoryName: string = '';
  isAdmin: boolean = false;

  constructor(private routeActivated: ActivatedRoute, private film: FilmService,
              private category: CategoryService, private auth: AuthService,
              private router: Router) { 
                this.isAdmin = this.auth.isAdmin();
              }

  ngOnInit(): void {
    this.routeActivated.paramMap.subscribe((params: ParamMap) => {
      const filmID = parseInt(params.get('id')!);

      this.film.getFilmById(filmID).subscribe(
        res => {
          this._movie = res;
          this.getCategoryName(this._movie.id_category);
        },
        error => {
          console.error('Error getting film', error);
        });
    });

  }

  getCategoryName(idCategory: number): void {
    this.category.getCategoryById(idCategory).subscribe(
      (category: any) => {    
        this._categoryName = category.name;
      },
      error => {
        console.error('Error getting category', error);
      });
  }

  openModal(): void {  
      const modal = new bootstrap.Modal(this.deleteFilmModal.nativeElement);
      modal.show()
  }

  deleteFilm(): void {
    this.film.delete(this._movie.id_film!).subscribe(
      res => {
        console.log('Film deleted', res);
        this.router.navigate(['/catalog']);
      },
      error => {
        console.error('Error deleting film', error);
      });
  }

  get movie(): Film {
    return this._movie;
  }

  get categoryName(): string {
    return this._categoryName;
  }
}
