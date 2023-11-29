import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FilmService } from 'src/app/services/film.service';

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.scss']
})
export class StreamComponent {
  private _id: number = 0;
  private _magnetLink: string = '';
  private _videoSrc: string = '';

  constructor(private activatedRoute: ActivatedRoute, private film: FilmService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this._id = parseInt(params.get('id')!);
      
      this.film.getMagnetLink(this.id).subscribe((res) => {  
        this._videoSrc = `http://localhost:8808/stream?torrentUrl=${res}`;
      },
      (error) => {
        console.error('Error en la llamada HTTP:', error);
      });
    })
    
  }

  get id(): number {
    return this._id;
  }

  get magnetLink(): string {
    return this._magnetLink;
  }

  get videoSrc(): string { 
    return this._videoSrc;
  }
}
