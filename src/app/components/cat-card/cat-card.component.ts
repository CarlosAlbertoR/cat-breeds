import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CatBreed } from '../../models';

@Component({
  selector: 'app-cat-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cat-card.component.html',
  styleUrl: './cat-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatCardComponent {
  @Input() cat: CatBreed | null = null;
}
