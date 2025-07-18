import { Component, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeroComponent } from "./layout/hero/hero.component";
import { MoviesService } from './features/movies/movies.service';
import { NavbarComponent } from './layout/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeroComponent, NavbarComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  private readonly _movieService = inject(MoviesService);
  // heroMovie = this._movieService.selectedMovie();
  heroMovie = computed(() => this._movieService.selectedMovie());
  showButton = false;

  constructor() {
    window.addEventListener('scroll', () => {
      this.showButton = window.scrollY > 800;
    });
  }

  goTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }



}
