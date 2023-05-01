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

  constructor(private data: SearchService, private pokemonData: PokemonService) { }

  ngOnInit() {
    this.data.currentSearch.subscribe(search => {
      this.search = search;
      console.log(this.search)
    });
    this.pokemonData.pokemon.subscribe(pokemon => {
      this.allPokemon = pokemon;
    });
    console.log(this.allPokemon)
  }
}