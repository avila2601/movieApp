import { Component, effect, inject, OnInit } from '@angular/core';
import { MoviesService } from './movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
})
export class MoviesComponent  {

 private readonly _moviesService = inject(MoviesService);

 readonly movies = this._moviesService.movies;

 

}
