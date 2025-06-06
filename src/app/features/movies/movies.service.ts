import { inject, Injectable, signal } from '@angular/core';
import { Movie, MovieResponse } from './models/movies.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class MoviesService {
movies = signal<Movie[]>([]);
trendingMovies = signal<Movie[]>([]);
selectedMovie = signal<Movie | null>(null);

currentPage = signal<number>(1);
hasMorePages = signal<boolean>(true);
isLoading = signal<boolean>(false);

private readonly _apiKey = 'd3ca801f868f5ad16989acc1ff252106';
private readonly _apiUrl = 'https://api.themoviedb.org/3';
// private readonly _searchTerm = signal<string>('');

private readonly _http = inject(HttpClient);

constructor() {
  this.getMovies();
}

getMovieById(MovieId: string): Observable<MovieResponse> {
  return this._http.get<MovieResponse>(`${this._apiUrl}/movie/${MovieId}?api_key=${this._apiKey}`);
}

getMovies(): void {
  this._http.get<MovieResponse>(`${this._apiUrl}/movie/popular?api_key=${this._apiKey}`)
  .pipe(
    tap((response) => {
      const currentMovies = this.movies();
      this.movies.set([...currentMovies, ...response.results])
      this.hasMorePages.set(response.page < response.total_pages);
      this.currentPage.update((currentPage) => currentPage + 1);
      this.isLoading.set(false);
    }))
  .subscribe();
}
}