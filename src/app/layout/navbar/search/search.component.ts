import { Component, inject, signal, input, linkedSignal } from '@angular/core';
import { Router } from '@angular/router';
import { MoviesService } from '../../../features/movies/movies.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { Movie } from '../../../features/movies/models/movies.interface';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
})
export class SearchComponent {

  constructor() { }

  searchQuery = signal<string>('');
  private readonly _router = inject(Router);
  private readonly _movieService = inject(MoviesService);

  filteredMovies = rxResource({
    request: this.searchQuery,
    loader: () => this._movieService.searchMovie(this.searchQuery()),
  })

  movies = linkedSignal(() => this.filteredMovies.value()?.results ?? ([] as Movie[]));

  onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }

  goToDetails(movieId: number): void {
    this._router.navigate(['/movies', movieId]);
    this._clearQuery();
  }

  private _clearQuery(): void {
    this.searchQuery.set('');
  }



}
