import { ChangeDetectionStrategy, Component, inject, input, OnInit } from '@angular/core';
import { Movie } from '../models/movies.interface';
import { JsonPipe } from '@angular/common';
import { ImageService } from '../../../shared/image.service';

@Component({
  selector: 'app-movie-card',
  templateUrl : './movie-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieCardComponent {

  movie = input.required<Movie>();
  imageError = (false);

  private readonly _imageService = inject(ImageService);

  getImageUrl(): string {
    const posterPath = this.movie().poster_path;
    return this._imageService.getImageUrl(posterPath);
  }

  setImageError(value: boolean): void {
    this.imageError = value;
  }




}
