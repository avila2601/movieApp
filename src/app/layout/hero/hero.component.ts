import { Component, input } from '@angular/core';
import { Movie } from '../../features/movies/models/movies.interface';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent {

  constructor() { }

  movie = input.required<Movie>();


}
