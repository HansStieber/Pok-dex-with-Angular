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
  progress!: string;
  @Input() stat: any;

  ngOnChanges() {
    this.statName = this.capitalizeWord(this.stat['stat']['name']);
    this.progressAsNumber = this.stat['base_stat'];
    this.progress = this.progressAsNumber + 'px';
  }


  capitalizeWord(word: string) {
    const capitalizeService = new CapitalizeService();
    return capitalizeService.capitalizedWord(word);
  }
}
