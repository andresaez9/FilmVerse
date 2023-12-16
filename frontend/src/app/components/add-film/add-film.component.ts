import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { map } from 'rxjs/internal/operators/map';
import { Film } from 'src/app/interfaces/film.interface';
import { CategoryService } from 'src/app/services/category.service';
import { FilmService } from 'src/app/services/film.service';
import { TorrentService } from 'src/app/services/torrent.service';

@Component({
  selector: 'app-add-film',
  templateUrl: './add-film.component.html',
  styleUrls: ['./add-film.component.scss']
})
export class AddFilmComponent {

  private _addFilmForm: FormGroup;

  constructor
  (
    private film: FilmService, 
    private category: CategoryService,
    private torrent: TorrentService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { 
    this._addFilmForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      director: ['', [Validators.required]],
      year: ['', [Validators.required , Validators.pattern('^[0-9]*$')]],
      image: ['', [Validators.required]],
      duration: ['', [Validators.required , Validators.pattern('^[0-9]*$')]],
      score: ['', [Validators.required , Validators.pattern('^[0-9]+(\.[0-9]{1})?$')]],
      id_category: ['', [Validators.required]],
      id_torrent: ['', [Validators.required]],
    });
  }

  addFilm() {
    if (this.addFilmForm.valid) {
      const filmData = this.addFilmForm.value;
  
      forkJoin([
        this.getIdCategory(filmData.id_category),
        this.getIdTorrent(filmData.id_torrent)
      ]).subscribe(([categoryId, torrentId]) => {
        if (categoryId !== null && torrentId !== null) {
          filmData.id_category = categoryId;
          filmData.id_torrent = torrentId;

          this.film.addFilm(filmData as Film).subscribe(
            res => {
              this.router.navigate(['/catalog']);
            },
            error => {
              console.error('Error adding film', error);
            }
          );
        } else {
          console.error('Category or Torrent not found');
        }
      });
    }
  }

  getIdCategory(name: string): Observable<number | null> {
    return this.category.getAllCategories().pipe(
      map((categories: any) => {
        const category = categories.find((cat: any) => cat.name === name);
        return category ? category.id_category : null;
      })
    );
  }
  
  getIdTorrent(magnet_link: string): Observable<number | null> {
    return this.torrent.getAllTorrents().pipe(
      map((torrents: any) => {
        const torrent = torrents.find((torr: any )=> torr.magnet_link === magnet_link);
        return torrent ? torrent.id_torrent : null;
      })
    );
  }

  get addFilmForm(): FormGroup {
    return this._addFilmForm;
  }
}
