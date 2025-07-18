import { Component, computed, HostListener, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { MovieRowComponent } from "./movie-row/movie-row.component";
import { MoviesService } from './movies.service';


@Component({
  selector: 'app-movies',
  imports: [RouterLink, MovieCardComponent, MovieRowComponent, MovieRowComponent],
  templateUrl: './movies.component.html',
})
export class MoviesComponent  {

  isLoading = computed(() => this._moviesService.isLoading());
  hasMorePages = computed(() => this._moviesService.hasMorePages());

 private readonly _moviesService = inject(MoviesService);
 private readonly _router = inject(Router);

 readonly movies = this._moviesService.movies;

 trendingMovies = computed (() => this._moviesService.trendingMovies());

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

  goToDetails(movieId: string): void {
    // Guardar la posición de scroll antes de navegar
    sessionStorage.setItem('movie-scroll', window.scrollY.toString());
    this._router.navigate(['/movies', movieId]).then(() => {
      setTimeout(() => {
        this.smoothScrollTo(window.innerHeight - 130, 800);
      }, 100);
    });
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
}
