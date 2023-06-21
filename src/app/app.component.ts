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
    private searchData: SearchService,
    private favoritesData: FavoritesService,
    private pokemonData: PokemonService,
    private router: Router
  ) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.setHeadline();
        this.checkEndOfPage();
      }
    })
  }


  /**
   * The function is called when the component is initialized. It checks if the user is close to the end of the content. It gets
   * all favorite pokemon from localStorage. It changes the favoritesData variable from the favorites service to the favorites taken
   * from the localStorage. It subscribes to the favoritesData from the favorites service. It subscribes to the searchData variable
   * from the search service. And it subscribes to the pokemonData variable from the pokemon service. It also checks the current scroll
   * position.
   */
  ngOnInit() {
    this.getFavoritesFromStorage();
    this.favoritesData.changeFavorites(this.favorites);

    this.favoritesData.favorites.subscribe(favorites => {
      this.favorites = favorites;
    });
    this.searchData.currentSearch.subscribe(search => {
      this.search = search;
    });
    this.pokemonData.pokemon.subscribe(pokemon => {
      this.allPokemon = pokemon;
    });
    this.checkScrollPos();
  }


  /**
   * The function pushes all Pokemon from one array to another.
   * 
   * @param sourceArray - Array that Pokemon are taken from
   * @param targetArray - Array that is being filled
   */
  pushObjects(sourceArray: Pokemon[], targetArray: Pokemon[]) {
    sourceArray.forEach(pokemon => {
      targetArray.push(pokemon);
    });
  }


  /**
   * The function scrolls the user to the top of the page.
   */
  scrollToTop() {
    window.scrollTo(0, 0);
  }


  @HostListener('window:scroll', ['$event'])

  /**
   * The function calls the checkEndOfPage function when pokemon are not loaded currently.
   */
  scroll() {
    if (!this.loading) {
      this.checkEndOfPage();
    }
  }


  /**
   * The functin checks on which route the user currently is and if the user is close to the end of the content, which
   * is when new pokemon are loaded.
   */
  checkEndOfPage() {
    this.checkScrollPos();
    if (this.router.url === '/pokemon' || this.router.url === '/' && this.search === '') {
      if (this.closeToEndOfPage()) {
        this.loadPokemon();
      }
    }
  }


  /**
   * The function checks the current scroll Position and sets the scrolled variable accordingly to show or not show
   * the back to top icon.
   */
  checkScrollPos() {
    this.scrollPos = window.innerHeight + window.scrollY;
    this.scrollLimitBottom = document.body.scrollHeight - 300;
    if (window.scrollY > 200) {
      this.scrolled = true;
    } else {
      this.scrolled = false;
    }
  }


  /**
   * The function returns if the user is close to the end of the content.
   */
  closeToEndOfPage() {
    return this.scrollPos >= this.scrollLimitBottom;
  }


  /**
   * The function loads new Pokemon from the current URL by subscribing to it. The new Pokemon are pushed to the allPokemon array.
   * The URL variable is set to the new url that defines the following pokemon. The pokemonData variable from the Pokemon service
   * is set to the currently loaded pokemon.
   */
  loadPokemon() {
    this.loading = true;
    this.http
      .get<any>(this.URL)
      .subscribe((data: any) => {
        this.newPokemon = data.results;
        this.pushObjects(this.newPokemon, this.allPokemon)
        this.URL = data.next;
        this.pokemonData.changePokemon(this.allPokemon);
        this.eventuallyLoadMorePokemon();
        this.hideLoader();
      });
  }


  /**
   * If the user is close to the end of the page, more pokemon are loaded.
   */
  eventuallyLoadMorePokemon() {
    setTimeout(() => {
      this.scrollLimitBottom = document.body.scrollHeight - 300;
      if (this.scrollLimitBottom <= 0) {
        this.loadPokemon();
      }
    }, 100);
  }


  /**
   * The function sets the loading variable to false after 500ms to make sure the loader is shown even if the page loads fast.
   */
  hideLoader() {
    setTimeout(() => {
      this.loading = false;
    }, 500);
  }


  /**
   * If there are favorite pokemon at saved at the local storage, the function parses the data and sets the favorites variable
   * to the data value.
   */
  getFavoritesFromStorage() {
    if (localStorage.getItem('favorite-pokemon') !== null) {
      let storedFavorites = localStorage.getItem('favorite-pokemon');
      this.favorites = JSON.parse(storedFavorites!);
    }
  }

  /**
   * The function focuses the search input field.
   */
  focusSearchInput() {
    this.pokesearch.nativeElement.focus();
  }


  /**
   * The function is called on key up and sets the searchData variable of the search service to the value of the search input field.
   */
  public onKeyUpEvent() {
    let searchValue = this.pokesearch.nativeElement.value.toLowerCase();
    this.searchData.changeSearch(searchValue);
  }


  /**
   * The function sets the route variable depending on which page the user currently is.
   */
  setHeadline() {
    if (this.router.url === '/pokemon' || this.router.url === '/') {
      this.route = 'All Pokémon';
    }
    if (this.router.url === '/favorites') {
      this.route = 'Your Favorite Pokémon';
    }
  }
}
