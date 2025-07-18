import { Component, inject, input } from '@angular/core';
import { Movie } from '../models/movies.interface';
import { ImageService } from '../../../shared/image.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-row',
  templateUrl: './movie-row.component.html',
})
export class MovieRowComponent {
  title = input<string>('Trending')
  movies = input.required<Movie[]>()
  page = 0;
  pageSize = 4;

  get pagedMovies(): Movie[] {
    const start = this.page * this.pageSize;
    return this.movies().slice(start, start + this.pageSize);
  }

  nextPage(): void {
    if ((this.page + 1) * this.pageSize < this.movies().length) {
      this.page++;
    }
  }

  prevPage(): void {
    if (this.page > 0) {
      this.page--;
    }
  }

  private readonly _imageService = inject(ImageService);
  private readonly _router = inject(Router);

  getImageUrl(posterPath: string): string {
    return this._imageService.getImageUrl(posterPath);
  }

  goToDetails(movieId: string): void {
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
