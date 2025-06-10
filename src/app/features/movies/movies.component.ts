import { Component, computed, HostListener, inject } from '@angular/core';
import { MoviesService } from './movies.service';
import { RouterLink } from '@angular/router';
import { MovieCardComponent } from './movie-card/movie-card/movie-card.component';

@Component({
  selector: 'app-movies',
  imports: [RouterLink, MovieCardComponent],
  templateUrl: './movies.component.html',
})
export class MoviesComponent  {

  isLoading = computed(() => this._moviesService.isLoading());
  hasMorePages = computed(() => this._moviesService.hasMorePages());

 private readonly _moviesService = inject(MoviesService);

 readonly movies = this._moviesService.movies;

 @HostListener('window:scroll')
 onScroll(): void {
    if (!this.isLoading() && this.hasMorePages()) {
      const scrollPosition = window.innerHeight + window.scrollY;
      const scrollThreshold = document.documentElement.scrollHeight - 200;

      if (scrollPosition >= scrollThreshold) {
        this._moviesService.getMovies();
      }
    }
  }
}
