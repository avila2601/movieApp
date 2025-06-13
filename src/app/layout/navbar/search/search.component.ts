import { Component, inject, signal, input, linkedSignal } from '@angular/core';
import { Router } from '@angular/router';
import { MoviesService } from '../../../features/movies/movies.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { Movie } from '../../../features/movies/models/movies.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-search',
  imports: [DatePipe],
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

  getImage(posterPath: string): string {
    return posterPath ? 'https://image.tmdb.org/t/p/w500' + posterPath : 'https://images.ctfassets.net/4cd45et68cgf/Rx83JoRDMkYNlMC9MKzcB/2b14d5a59fc3937afd3f03191e19502d/Netflix-Symbol.png?w=700&h=456';
  }

  onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }

  goToDetails(movieId: string): void {
    this._router.navigate(['/movies', movieId]);
    this._clearQuery();
  }

  private _clearQuery(): void {
    this.searchQuery.set('');
  }



}
