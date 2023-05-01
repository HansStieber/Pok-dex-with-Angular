import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { SearchService } from './services/search.service';
import { Pokemon } from './models/pokemon.class';
import { HttpClient } from '@angular/common/http';
import { FavoritesService } from './services/favorites.service';
import { PokemonService } from './services/pokemon.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  newPokemon: Pokemon[] = [];
  allPokemon: Pokemon[] = [];
  URL = 'https://pokeapi.co/api/v2/pokemon/';
  loading = false;
  scrollPos!: number;
  scrollLimitBottom!: number;
  value = '';
  search!: string;
  favorites: Pokemon[] = [];
  route!: string;
  scrolled: boolean = false;
  @ViewChild('pokesearch') pokesearch!: ElementRef;


  constructor(
    private http: HttpClient,
    private data: SearchService,
    private favoritesData: FavoritesService,
    private pokemonData: PokemonService,
    private router: Router
  ) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (this.router.url === '/pokemon') {
          this.checkEndOfPage();
        }
        this.setHeadline();
      }
    });
  }

  ngOnInit() {
    this.checkEndOfPage();
    this.getFavoritesFromStorage();
    this.favoritesData.changeFavorites(this.favorites);

    this.favoritesData.favorites.subscribe(favorites => {
      this.favorites = favorites;
    });
    this.data.currentSearch.subscribe(search => {
      this.search = search;
    });
    this.pokemonData.pokemon.subscribe(pokemon => {
      this.allPokemon = pokemon;
    });
    this.checkScrollPos();
  }


  pushObjects(sourceArray: Pokemon[], targetArray: Pokemon[]) {
    sourceArray.forEach(pokemon => {
      targetArray.push(pokemon);
    });
  }


  scrollToTop() {
    window.scrollTo(0, 0);
  }


  @HostListener('window:scroll', ['$event'])


  scroll() {
    if (!this.loading) {
      this.checkEndOfPage();
    }
  }


  checkEndOfPage() {
    this.checkScrollPos();
    if (this.router.url === '/pokemon'|| this.router.url === '/') {
      this.scrollPos = window.innerHeight + window.scrollY;
      this.scrollLimitBottom = document.body.scrollHeight - 300;
      if (this.closeToEndOfPage()) {
        this.loadPokemon();
      }
    }
  }


  checkScrollPos() {
    if (window.scrollY > 200) {
      this.scrolled = true;
    } else {
      this.scrolled = false;
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
          }
        }, 100);
        setTimeout(() => {
          this.loading = false;
        }, 500);
      });
  }


  getFavoritesFromStorage() {
    if (localStorage.getItem('favorite-pokemon') !== null) {
      let storedFavorites = localStorage.getItem('favorite-pokemon');
      this.favorites = JSON.parse(storedFavorites!);
    }
  }


  focusSearchInput() {
    this.pokesearch.nativeElement.focus();
  }


  public onKeyUpEvent() {
    let searchValue = this.pokesearch.nativeElement.value.toLowerCase();
    this.data.changeSearch(searchValue);
  }


  setHeadline() {
    if (this.router.url === '/pokemon' || this.router.url === '/') {
      this.route = 'All Pokémon';
    }
    if (this.router.url === '/favorites') {
      this.route = 'Your Favorite Pokémon';
    }
  }
}
