import { Component, inject, signal, input, linkedSignal, model } from '@angular/core';
import { Router } from '@angular/router';
import { MoviesService } from '../../../features/movies/movies.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { Movie } from '../../../features/movies/models/movies.interface';
import { DatePipe } from '@angular/common';
import { ImageService } from '../../../shared/image.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  imports: [DatePipe, FormsModule],
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
    this._router.navigate(['/movies', movieId]);
    this._clearQuery();
  }

  private _clearQuery(): void {
    this.searchQuery.set('');
  }



}
