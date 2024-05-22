import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CatService } from '../../service/cat.service';
import { CatBreed } from '../../models';
import { Observable, Subject, map, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-breed-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './breed-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreedDetailComponent implements OnInit, OnDestroy {
  breed$: Observable<CatBreed> | undefined;
  private destroy$ = new Subject<void>();

  constructor(private route: ActivatedRoute, private catService: CatService) {}

  ngOnInit(): void {
    this.breed$ = this.route.params.pipe(
      takeUntil(this.destroy$),
      map((params) => params['id']),
      switchMap((breedId) => this.catService.getCatBreed(breedId))
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
