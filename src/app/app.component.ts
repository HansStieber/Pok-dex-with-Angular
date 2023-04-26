import { Component, ElementRef, ViewChild } from '@angular/core';
import { SearchService } from './services/search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'poke-api';
  value = '';
  search!: string;
  @ViewChild('pokesearch') pokesearch!: ElementRef;


  constructor(private data: SearchService) { }

  ngOnInit() {
    this.data.currentSearch.subscribe(search => {
      this.search = search;
    });
  }


  focusSearchInput() {
    this.pokesearch.nativeElement.focus();
  }


  public onKeyUpEvent() {
    let searchValue = this.pokesearch.nativeElement.value.toLowerCase();
    this.data.changeSearch(searchValue);
  }
}
