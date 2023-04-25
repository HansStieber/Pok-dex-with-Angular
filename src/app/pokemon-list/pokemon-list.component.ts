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
  newPokemon: Pokemon[] = [];
  allPokemon: Pokemon[] = [];
  URL = 'https://pokeapi.co/api/v2/pokemon/';
  loading = false;
  search!: string;


  constructor(private http: HttpClient, private data: SearchService) { }


  ngOnInit() {
    this.checkEndOfPage();

    this.data.currentSearch.subscribe(search => {
      this.search = search;
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

      this.loadPokemon();
      if (scrollLimitBottom <= 0) {
        true
      }
    }
  }


  closeToEndOfPage(scrollPos: number, scrollLimitBottom: number) {
    return scrollPos >= scrollLimitBottom;
  }

  loadPokemon() {
    this.loading = true;
      this.http
        .get<any>(this.URL)
        .subscribe(data => {
          this.newPokemon = data['results'];
          this.pushObjects(this.newPokemon, this.allPokemon)
          this.URL = data['next'];
          setTimeout(() => {
            this.loading = false;
          }, 1000);
        });
  }
}