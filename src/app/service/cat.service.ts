import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CatBreed, CatImage } from '../models';
import { Observable, forkJoin, map, mergeMap, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CatService {
  private baseURL = 'https://api.thecatapi.com/v1';

  constructor(private http: HttpClient) {}

  getCatBreeds(page: number): Observable<CatBreed[]> {
    return this.http
      .get<CatBreed[]>(`${this.baseURL}/breeds?page=${page}&limit=10`)
      .pipe(
        mergeMap((breeds: CatBreed[]) => {
          const breedRequests = breeds.map((breed) =>
            this.assignImageToBreed(breed)
          );
          return forkJoin(breedRequests);
        })
      );
  }

  getCatBreed(breedId: string): Observable<CatBreed> {
    return this.http
      .get<CatBreed>(`${this.baseURL}/breeds/${breedId}`)
      .pipe(mergeMap((breed: CatBreed) => this.assignImageToBreed(breed)));
  }

  getCatImage(imageId: string): Observable<CatImage> {
    return this.http.get<CatImage>(`${this.baseURL}/images/${imageId}`);
  }

  private assignImageToBreed(breed: CatBreed): Observable<CatBreed> {
    if (breed.reference_image_id) {
      return this.getCatImage(breed.reference_image_id).pipe(
        map((image: CatImage) => {
          breed.image_url = image.url;
          return breed;
        })
      );
    } else {
      return of(breed);
    }
  }
}
