import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { Details } from '../models/details.class';

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.scss']
})
export class DetailViewComponent implements OnInit {
details!: Details;
types: any;
type!: string;

ngOnInit(): void {
  this.types = this.details.types[0];
  this.type = this.types['type']['name'];
  console.log('details from detail-view', this.details)
}
}
