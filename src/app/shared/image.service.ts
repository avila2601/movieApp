import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class ImageService {

  private readonly IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
  private readonly DEFAULT_POSTER_PATH ='https://images.ctfassets.net/4cd45et68cgf/Rx83JoRDMkYNlMC9MKzcB/2b14d5a59fc3937afd3f03191e19502d/Netflix-Symbol.png';
  private readonly BACKDROP_PATH = 'https://images.ctfassets.net/4cd45et68cgf/Rx83JoRDMkYNlMC9MKzcB/2b14d5a59fc3937afd3f03191e19502d/Netflix-Symbol.png';

  getImageUrl(posterPath: string | null, type: 'poster' | 'backdrop' = 'poster'): string {
    if(!posterPath){
      return type === 'poster' ? this.DEFAULT_POSTER_PATH : this.BACKDROP_PATH;
    }
    return `${this.IMAGE_BASE_URL}${posterPath}`;
  }
}