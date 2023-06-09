import { Component } from '@angular/core';
import { FavoritesService } from '../services/favorites.service';
import { Pokemon } from '../models/pokemon.class';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-pokemon-favorites',
  templateUrl: './pokemon-favorites.component.html',
  styleUrls: ['./pokemon-favorites.component.scss']
})
export class PokemonFavoritesComponent {
  search!: string;
  favorites: Pokemon[] = [];


  constructor(
    private favoritesData: FavoritesService,
    private searchData: SearchService
  ) { }


  /**
   * This function runs when the component gets initialized. It subscribes to the search and favorites services, wich provide information of
   * current input at the search input field and current favorite pokemon.
   */
  ngOnInit(): void {
    this.searchData.currentSearch.subscribe(search => {
      this.search = search;
    });
    this.favoritesData.favorites.subscribe(favorites => {
      this.favorites = favorites;
    });
  }
}
