import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from '../../features/movies/models/movies.interface';
import { MoviesService } from '../../features/movies/movies.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
})
export class HeroComponent {

  movie = input.required<Movie>();

  private readonly _router = inject(Router);
  private readonly _moviesService = inject(MoviesService);

  constructor() { }

  verTrailer(): void {
    const movieData = this.movie();
    this._moviesService.getMovieTrailer(movieData.id).subscribe((res) => {
      const trailer = res.results.find((v: any) => v.site === 'YouTube' && v.type === 'Trailer');
      if (trailer) {
        window.open(`https://www.youtube.com/watch?v=${trailer.key}`, '_blank');
      } else {
        alert('No se encontró tráiler para esta película.');
      }
    });
  }

  masInformacion(): void {
    const movieData = this.movie();

    // Primero hacer scroll hasta el final del hero
    const heroHeight = window.innerHeight * 0.8; // 80vh del hero
    window.scrollTo({
      top: heroHeight,
      behavior: 'smooth'
    });

    // Esperar un poco para que termine el scroll y luego navegar
    setTimeout(() => {
      this._router.navigate(['/movies', movieData.id]);
    }, 0); // 600ms para que termine el scroll suave
  }


}
