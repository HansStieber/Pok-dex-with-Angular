import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-stat-progress',
  templateUrl: './stat-progress.component.html',
  styleUrls: ['./stat-progress.component.scss']
})
export class StatProgressComponent implements OnChanges {
  @Input() progress!: number;

  ngOnChanges() {
    console.log(this.progress)
  }
}
