import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, filter, forkJoin, map } from 'rxjs';
import { CategoryResponse } from 'src/app/interfaces/category.interface';
import { Film } from 'src/app/interfaces/film.interface';
import { CategoryService } from 'src/app/services/category.service';
import { FilmService } from 'src/app/services/film.service';
import { TorrentService } from 'src/app/services/torrent.service';

@Component({
  selector: 'app-update-film',
  templateUrl: './update-film.component.html',
  styleUrls: ['./update-film.component.scss']
})
export class UpdateFilmComponent {
  private _updateFilmForm: FormGroup;
  private _filmID: number = 0;

  constructor
  (
    private film: FilmService, 
    private category: CategoryService,
    private torrent: TorrentService,
    private formBuilder: FormBuilder,
    private router: Router,
    private routerActivated: ActivatedRoute
  ) { 
    this._updateFilmForm = this.formBuilder.group({
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

  ngOnInit(): void {
    this.routerActivated.paramMap.subscribe(params => {
      this._filmID = parseInt(params.get('id')!);
  
      this.film.getFilmById(this._filmID).subscribe(
        res => {
          forkJoin([
            this.getNameCategory(res.id_category),
            this.getMagnetLink(res.id_torrent)
          ]).pipe(
              filter(([category, magnetLink]) => category !== undefined && magnetLink !== undefined)
          ).subscribe(
            ([category, magnetLink]) => {

              this._updateFilmForm.patchValue({
                title: res.title,
                description: res.description,
                director: res.director,
                year: res.year,
                image: res.image,
                duration: res.duration,
                score: res.score,
                id_category: category,
                id_torrent: magnetLink
              });
            }
          );
        }
      );
    });
  }
  
  updateFilm() {
    if (this._updateFilmForm.valid) {
      const filmData = this._updateFilmForm.value;
  
      forkJoin([
        this.getIdCategory(filmData.id_category),
        this.getIdTorrent(filmData.id_torrent)
      ]).subscribe(([categoryId, torrentId]) => {
        if (categoryId !== null && torrentId !== null) {
          filmData.id_category = categoryId;
          filmData.id_torrent = torrentId;

          this.film.update(this.filmID, filmData as Film).subscribe(
            res => {
              console.log('Film updated', res);
              this.router.navigate([`/view/${this.filmID}`]);
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

  private getNameCategory(id: number): Observable<string> {
    return this.category.getCategoryById(id).pipe(
      map((category: any) => {
        console.log('Category', category);
        return category.name;
      })
    );
  }
  
  private getMagnetLink(id: number): Observable<string> {
    return this.torrent.getMagnetLinkById(id).pipe(
      map((torrent: any) => {
        console.log('Torrent', torrent);
        return torrent;
      })
    );
  }

  private getIdCategory(name: string): Observable<number | null> {
    return this.category.getAllCategories().pipe(
      map((categories: any) => {
        const category = categories.find((cat: any) => cat.name == name);
        return category ? category.id_category : null;
      })
    );
  }
  
  private getIdTorrent(magnet_link: string): Observable<number | null> {
    return this.torrent.getAllTorrents().pipe(
      map((torrents: any) => {
        const torrent = torrents.find((torr: any )=> torr.magnet_link === magnet_link);
        return torrent ? torrent.id_torrent : null;
      })
    );
  }

  get updateFilmForm(): FormGroup {
    return this._updateFilmForm;
  }

  get filmID(): number {
    return this._filmID;
  }
}
