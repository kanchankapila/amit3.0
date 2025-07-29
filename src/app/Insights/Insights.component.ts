import { Component , ViewEncapsulation, OnInit, ChangeDetectionStrategy } from '@angular/core';


@Component({
  selector: 'app-insights',
  templateUrl: './Insights.component.html',
  styleUrls: ['./Insights.component.scss'],
  encapsulation: ViewEncapsulation.None,
  // Use OnPush change detection since this page is mostly static
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InsightsComponent implements OnInit {
  constructor() {
  }
  async ngOnInit() {
    await Promise.all([
    ])
   
  }
   
}
