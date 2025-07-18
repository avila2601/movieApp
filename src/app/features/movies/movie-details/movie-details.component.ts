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

  verTrailer(): void {
    this._moviesService.getMovieTrailer(this.movieId()).subscribe((res) => {
      const trailer = res.results.find((v: any) => v.site === 'YouTube' && v.type === 'Trailer');
      if (trailer) {
        window.open(`https://www.youtube.com/watch?v=${trailer.key}`, '_blank');
      } else {
        alert('No se encontró tráiler para esta película.');
      }
    });
  }

  goBack(): void {
    this._router.navigate(['/..']).then(() => {
      const scroll = sessionStorage.getItem('movie-scroll');
      if (scroll) {
        setTimeout(() => {
          window.scrollTo({ top: parseInt(scroll, 10), behavior: 'smooth' });
          sessionStorage.removeItem('movie-scroll');
        }, 100);
      }
    });
  }

  getImageUrl(posterPath: string | null): string {
    return this._imageService.getImageUrl(posterPath);
  }

}
