import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { MoviesService } from '../movies.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { DatePipe, DecimalPipe } from '@angular/common';
import { ImageService } from '../../../shared/image.service';

@Component({
  selector: 'app-movie-details',
  imports: [DatePipe, DecimalPipe],
  templateUrl: './movie-details.component.html',
})
export class MovieDetailsComponent  {

  movieId = input.required<string>();

  private readonly _router = inject(Router);
  private readonly _moviesService = inject(MoviesService);
  private readonly _imageService = inject(ImageService);

  movie = rxResource({
    request: this.movieId,
    loader: ()=> this._moviesService.getMovieById(this.movieId())
  })

  goBack(): void {
    this._router.navigate(['/..']);
  }

  getImageUrl(posterPath: string | null): string {
    return this._imageService.getImageUrl(posterPath);
  }

}
