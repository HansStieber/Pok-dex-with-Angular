import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'poke-api';
  value = '';
  public search = '';
  @ViewChild('pokesearch') pokesearch!: ElementRef;


  constructor() { }


  focusSearchInput() {
    this.pokesearch.nativeElement.focus();
  }


  public onKeyUpEvent(event: any) {
    this.search = this.pokesearch.nativeElement.value.toLowerCase();
    console.log(this.search)
  }
}
