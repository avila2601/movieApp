import { ChangeDetectionStrategy, Component, input, OnInit } from '@angular/core';
import { Movie } from '../../models/movies.interface';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-movie-card',
  templateUrl : './movie-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieCardComponent {

  movie = input.required<Movie>();
  imageError = (false);

  getImageUrl(): string {
    const baseUrl = 'https://image.tmdb.org/t/p/w500';
    return this.imageError ? 'placeholder.png' : `${baseUrl}/${this.movie().poster_path}`;
  }

  setImageError(value: boolean): void {
    this.imageError = value;
  }




}
