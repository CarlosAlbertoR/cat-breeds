import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CatBreed, CatImage } from '../models';
import { Observable, forkJoin, map, mergeMap, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CatService {
  private baseURL = 'https://api.thecatapi.com/v1';

  constructor(private http: HttpClient) {}

  getCatBreeds(page: number, searchTerm: string = ''): Observable<CatBreed[]> {
    console.log('searchTerm', searchTerm);
    let apiUrl = `${this.baseURL}/breeds`;
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', '10');
    if (searchTerm) {
      apiUrl = `${apiUrl}/search`;
      params = params.set('q', searchTerm).set('attach_image', '1');
    }

    return this.http.get<CatBreed[]>(apiUrl, { params }).pipe(
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
