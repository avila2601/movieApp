import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { SearchComponent } from './search/search.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, SearchComponent],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  private readonly _router = inject(Router);
  constructor() { }

  goHome(): void {
    this._router.navigate(['/']).then(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  goMovies(): void {
    this._router.navigate(['/movies']).then(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}
