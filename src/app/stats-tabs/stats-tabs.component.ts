import { Component, Input, OnChanges } from '@angular/core';
import { Details } from '../models/details.class';

@Component({
  selector: 'app-stats-tabs',
  templateUrl: './stats-tabs.component.html',
  styleUrls: ['./stats-tabs.component.scss']
})
export class StatsTabsComponent implements OnChanges {
  baseXp!: number;
  height!: number;
  weight!: number;
  stats!: object[];
  moves!: object[];
  @Input() details!: Details;


  /**
   * The function is called when the parent component changes the value of the details Input variable. It sets new
   * values to a couple of values.
   */
  ngOnChanges(): void {
    this.baseXp = this.details['base_experience'];
    this.height = this.details['height'] / 10;
    this.weight = this.details['weight'] / 10;
    this.stats = this.details['stats'];
    this.moves = this.details['moves'];
  }
}
