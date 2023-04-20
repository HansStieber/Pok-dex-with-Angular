import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Details } from '../models/details.class';
import {MatDialog} from '@angular/material/dialog';
import {DetailViewComponent} from '../detail-view/detail-view.component'

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent {
  @Input() url!: string;
  details: Details = new Details();
  types: any;
  type!: string;

  
  constructor(private http: HttpClient, public dialog: MatDialog) {
  }


  async ngOnInit() {
    this.http
      .get<any>(this.url)
      .subscribe(data => {
        this.details = new Details(data);
        this.types = this.details.types[0];
        this.type = this.types['type']['name'];
        console.log(this.details)
      });
      
  }


  openDialog() {
    const dialog = this.dialog.open(DetailViewComponent);
    dialog.componentInstance.details = new Details(this.details.toJSON());
  }
}
