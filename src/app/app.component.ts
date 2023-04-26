import { Component, ElementRef, ViewChild } from '@angular/core';
import { SearchService } from './services/search.service';
import { Pokemon } from './models/pokemon.class';
import { FavoritesService } from './services/favorites.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'poke-api';
  value = '';
  search!: string;
  favorites: Pokemon[] = [];
  @ViewChild('pokesearch') pokesearch!: ElementRef;


  constructor(private data: SearchService, private favoritesData: FavoritesService) { }


  ngOnInit() {
    this.getFavoritesFromStorage();
    this.favoritesData.changeFavorites(this.favorites);

    this.favoritesData.favorites.subscribe(favorites => {
      this.favorites = favorites;
    });
    
    this.data.currentSearch.subscribe(search => {
      this.search = search;
    });
  }


  getFavoritesFromStorage() {
    let storedFavorites = localStorage.getItem('favorite-pokemon');
    this.favorites = JSON.parse(storedFavorites!);
  }


  focusSearchInput() {
    this.pokesearch.nativeElement.focus();
  }


  public onKeyUpEvent() {
    let searchValue = this.pokesearch.nativeElement.value.toLowerCase();
    this.data.changeSearch(searchValue);
  }
}
