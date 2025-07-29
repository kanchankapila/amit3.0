import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-sector',
  standalone: true,
  imports: [],
  templateUrl: './sector.component.html',
  styleUrl: './sector.component.scss',
  // Use OnPush change detection for better performance
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectorComponent {

}
