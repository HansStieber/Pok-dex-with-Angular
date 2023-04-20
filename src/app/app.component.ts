import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'poke-api';
  value = '';
  @ViewChild('pokesearch') pokesearch!: ElementRef;


  constructor() {}


  focusSearchInput() {
    this.pokesearch.nativeElement.focus();
  }
}
