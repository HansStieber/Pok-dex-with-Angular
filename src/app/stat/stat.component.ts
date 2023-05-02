import { Component, Input, OnChanges } from '@angular/core';
import { CapitalizeService } from '../services/capitalize.service';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.scss']
})
export class StatComponent implements OnChanges {
  statName!: string;
  progressAsNumber!: number;
  progressAsString!: string;
  @Input() stat: any;


  /**
   * The function is called when the parent component changes the value of the stat Input variable. It sets the
   * statName variable, the progressAsNumber variable and the progress variable.
   */
  ngOnChanges() {
    this.statName = this.capitalizeWord(this.stat['stat']['name']);
    this.progressAsNumber = this.stat['base_stat'];
    this.progressAsString = this.progressAsNumber + 'px';
  }


  /**
   * The function capitalizes a given word.
   */
  capitalizeWord(word: string) {
    const capitalizeService = new CapitalizeService();
    return capitalizeService.capitalizedWord(word);
  }
}
