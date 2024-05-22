import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CatService } from '../../service/cat.service';
import { CatBreed } from '../../models';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CatFilterComponent } from '../../components/cat-filter/cat-filter.component';
import { CatCardComponent } from '../../components/cat-card/cat-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CatCardComponent,
    CatFilterComponent,
    CommonModule,
    InfiniteScrollModule,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  breeds: CatBreed[] = [];
  currentPage = 0;
  isLoading = false;

  constructor(private catService: CatService) {}

  ngOnInit(): void {
    this.loadMore();
  }

  loadMore(): void {
    if (this.isLoading) return;

    this.isLoading = true;
    this.currentPage++;
    this.catService.getCatBreeds(this.currentPage).subscribe({
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
