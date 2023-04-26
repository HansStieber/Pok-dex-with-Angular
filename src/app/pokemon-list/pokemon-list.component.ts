import { Component, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from '../models/pokemon.class';
import { SearchService } from '../services/search.service';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-root',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent {
  newPokemon: Pokemon[] = [];
  allPokemon: Pokemon[] = [];
  URL = 'https://pokeapi.co/api/v2/pokemon/';
  loading = false;
  search!: string;
  scrollPos!: number;
  scrollLimitBottom!: number;

  constructor(private http: HttpClient, private data: SearchService, private pokemonData: PokemonService) { }

  ngOnInit() {
    this.checkEndOfPage();
    this.data.currentSearch.subscribe(search => {
      this.search = search;
    });
    this.pokemonData.pokemon.subscribe(pokemon => {
      this.allPokemon = pokemon;
    });
  }


  pushObjects(sourceArray: Pokemon[], targetArray: Pokemon[]) {
    sourceArray.forEach(pokemon => {
      targetArray.push(pokemon);
    });
  }


  @HostListener('window:scroll', ['$event'])


  scroll() {
    this.checkEndOfPage();
  }


  checkEndOfPage() {
    this.scrollPos = window.innerHeight + window.scrollY;
    this.scrollLimitBottom = document.body.scrollHeight - 300;
    if (this.closeToEndOfPage()) {
      this.loadPokemon();
    }
  }


  closeToEndOfPage() {
    return this.scrollPos >= this.scrollLimitBottom;
  }


  loadPokemon() {
    this.loading = true;
    this.http
      .get<any>(this.URL)
      .subscribe(data => {
        this.newPokemon = data['results'];
        this.pushObjects(this.newPokemon, this.allPokemon)
        this.URL = data['next'];
        this.scrollLimitBottom = document.body.scrollHeight - 300;
        this.pokemonData.changePokemon(this.allPokemon);
        setTimeout(() => {
          if (this.scrollLimitBottom <= 0) {
            this.loadPokemon();
            console.log(this.scrollLimitBottom)
          }
        }, 100);
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      });
  }
}