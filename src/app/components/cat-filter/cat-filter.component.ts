import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-cat-filter',
  standalone: true,
  imports: [CommonModule],
  template: `<p>cat-filter works!</p>`,
  styleUrl: './cat-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatFilterComponent {}
