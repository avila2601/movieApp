import { Component, inject, signal, input, linkedSignal, model } from '@angular/core';
import { Router } from '@angular/router';
import { MoviesService } from '../../../features/movies/movies.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { Movie } from '../../../features/movies/models/movies.interface';
import { DatePipe, NgIf } from '@angular/common';
import { ImageService } from '../../../shared/image.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  imports: [DatePipe, FormsModule, NgIf],
  templateUrl: './search.component.html',
})
export class SearchComponent {

  searchQuery = model<string>('');
  private readonly _router = inject(Router);
  private readonly _movieService = inject(MoviesService);
  private readonly _imageService = inject(ImageService);

  filteredMovies = rxResource({
    request: this.searchQuery,
    loader: () => this._movieService.searchMovie(this.searchQuery()),
  })

  movies = linkedSignal(() => this.filteredMovies.value()?.results ?? ([] as Movie[]));

  getImageUrl(posterPath: string): string {
    return this._imageService.getImageUrl(posterPath);
  }

  // onSearchInput(event: Event): void {
  //   const input = event.target as HTMLInputElement;
  //   this.searchQuery.set(input.value);
  // }

  goToDetails(movieId: string): void {
    this._router.navigate(['/movies', movieId]).then(() => {
      setTimeout(() => {
        this.smoothScrollTo(window.innerHeight - 140, 800);
      }, 100);
    });
    this._clearQuery();
  }

  /**
   * Desplazamiento suave personalizado
   * @param targetY posición Y a la que desplazarse
   * @param duration duración en ms
   */
  private smoothScrollTo(targetY: number, duration: number) {
    const startY = window.scrollY;
    const change = targetY - startY;
    const startTime = performance.now();
    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      window.scrollTo(0, startY + change * this.easeInOutQuad(progress));
      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };
    requestAnimationFrame(animateScroll);
  }

  private easeInOutQuad(t: number) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  private _clearQuery(): void {
    this.searchQuery.set('');
  }



}
