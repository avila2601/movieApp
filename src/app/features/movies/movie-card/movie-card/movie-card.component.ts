import { ChangeDetectionStrategy, Component, input, OnInit } from '@angular/core';
import { Movie } from '../../models/movies.interface';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-movie-card',
  imports: [JsonPipe],
  template: `<p>{{ movie() | json }}</p>`,
  styleUrls: ['./movie-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieCardComponent {

  movie = input.required<Movie>();



}
