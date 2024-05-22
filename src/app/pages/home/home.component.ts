import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CatService } from '../../service/cat.service';
import { CatBreed } from '../../models';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CatCardComponent } from '../../components/cat-card/cat-card.component';
import { SearchComponent } from '../../components/search/search.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CatCardComponent,
    CommonModule,
    InfiniteScrollModule,
    SearchComponent,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  searchTerm$ = new Subject<string>();

  breeds: CatBreed[] = [];
  currentPage = 0;
  isLoading = false;

  constructor(private catService: CatService) {}

  ngOnInit(): void {
    this.setupSearch();
    this.loadMore();
  }

  setupSearch(): void {
    this.searchTerm$.subscribe((searchTerm) => {
      this.currentPage = 0;
      this.breeds = [];
      this.loadMore(searchTerm);
    });
  }

  onSearchTermChanged(searchTerm: string): void {
    this.searchTerm$.next(searchTerm);
  }

  loadMore(searchTerm: string = ''): void {
    if (this.isLoading) return;

    this.isLoading = true;
    this.currentPage++;

    this.catService.getCatBreeds(this.currentPage, searchTerm).subscribe({
      next: (breeds) => {
        this.breeds.push(...breeds);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching cat breeds:', error);
        this.isLoading = false;
      },
    });
  }

  trackByFn(index: number, item: CatBreed): string {
    return item.id; // Use unique identifier of each item
  }
}
