import { Component, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from '../models/pokemon.class';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-root',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent {
  title = 'poke-api';
  newPokemon: Pokemon[] = [];
  public allPokemon: Pokemon[] = [];
  searchedPokemon: Pokemon[] = [];
  API_URL = 'https://pokeapi.co/api/v2/pokemon/';
  NEXT_URL = ''
  value = '';
  loading = false;
  search: string | undefined;


  constructor(private http: HttpClient, private data: SearchService) { }


  ngOnInit() {
    this.loading = true;
    this.http
      .get<any>(this.API_URL)
      .subscribe(data => {
        this.newPokemon = data['results'];
        this.pushObjects(this.newPokemon, this.allPokemon)
        this.NEXT_URL = data['next'];
        this.checkEndOfPage();
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      });
      
    this.data.currentSearch.subscribe(search => {
      this.search = search
      console.log(this.search)
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
    let scrollPos: number = window.innerHeight + window.scrollY;
    let scrollLimitBottom: number = document.body.scrollHeight - 200;
    if (this.closeToEndOfPage(scrollPos, scrollLimitBottom)) {

      this.loading = true;
      this.http
        .get<any>(this.NEXT_URL)
        .subscribe(data => {
          this.newPokemon = data['results'];
          this.pushObjects(this.newPokemon, this.allPokemon)
          this.NEXT_URL = data['next'];
          console.log(this.allPokemon)
          setTimeout(() => {
            this.loading = false;
          }, 1000);
        });
      if (scrollLimitBottom <= 0) {
        true
      }
    }
  }


  closeToEndOfPage(scrollPos: number, scrollLimitBottom: number) {
    return scrollPos >= scrollLimitBottom;
  }
}