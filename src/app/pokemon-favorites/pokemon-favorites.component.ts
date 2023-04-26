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

  constructor(private favoritesData: FavoritesService, private searchData: SearchService) { }

  ngOnInit(): void {
    this.searchData.currentSearch.subscribe(search => {
    this.search = search;
  });
    this.favoritesData.favorites.subscribe(favorites => {
      this.favorites = favorites;
    });
  }
}
