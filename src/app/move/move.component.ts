import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-move',
  templateUrl: './move.component.html',
  styleUrls: ['./move.component.scss']
})
export class MoveComponent implements OnInit {
 @Input() move!: any;
 name!: string;

 ngOnInit(): void {
   this.name = this.move['move']['name'];
 }
}
