import { Component, input } from '@angular/core';
import { Movie } from '../../features/movies/models/movies.interface';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
})
export class HeroComponent {

  constructor() { }

  movie = input.required<Movie>();


}
