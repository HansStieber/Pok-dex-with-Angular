import { Component } from '@angular/core';
import { Pokemon } from '../models/pokemon.class';
import { SearchService } from '../services/search.service';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-root',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent {
  allPokemon: Pokemon[] = [];
  search!: string;


  constructor(
    private data: SearchService,
    private pokemonData: PokemonService
  ) { }


  /**
   * This function runs when the component gets initialized. It subscribes to the search and pokemon services, wich provide information of
   * current input at the search input field and all currently loaded pokemon.
   */
  ngOnInit() {
    this.data.currentSearch.subscribe(search => {
      this.search = search;
    });
    this.pokemonData.pokemon.subscribe(pokemon => {
      this.allPokemon = pokemon;
    });
  }
}