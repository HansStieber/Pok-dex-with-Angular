import { Component, HostListener, OnInit } from '@angular/core';
import { Details } from '../models/details.class';
import { PokemonService } from '../services/pokemon.service';
import { Pokemon } from '../models/pokemon.class';
import { HttpClient } from '@angular/common/http';
import { FavoritesService } from '../services/favorites.service';
import { Router } from '@angular/router';
import { CapitalizeService } from '../services/capitalize.service';
import { MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.scss']
})
export class DetailViewComponent implements OnInit {
  details!: Details;
  name: any;
  allPokemon: Pokemon[] = [];
  types: any;
  type!: string;
  id!: number;
  favorites: Pokemon[] = [];
  alreadyFavorite: boolean = false;
  imgUrl!: string;


  constructor(
    private dialogRef: MatDialogRef<DetailViewComponent>,
    private http: HttpClient,
    private pokemonData: PokemonService,
    private favoritesData: FavoritesService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) { }


  /**
   * This function runs when the component gets initialized. It subscribes to the pokemon and favorites services, which
   * provide all currently loaded pokemon and current favorite pokemon. It also sets detail variables that provide
   * information about the pokemon that is currently opened in detail view. It also checks if the current pokemon is
   * already added to the favorites list.
   */
  ngOnInit(): void {
    this.pokemonData.pokemon.subscribe(pokemon => {
      this.allPokemon = pokemon;
    });
    this.favoritesData.favorites.subscribe(favorites => {
      this.favorites = favorites;
    });
    this.getDetails();
    this.checkIfPokemonIsFavorite();
  }


  /**
   * This function Capitalizes a word with the CapitalizeService.
   */
  capitalizeWord(word: string) {
    const capitalizeService = new CapitalizeService();
    return capitalizeService.capitalizedWord(word);
  }


  /**
   * This function sets the detail variables of the pokemon that is currently viewed in detail view.
   */
  getDetails() {
    this.types = this.details.types[0];
    this.type = this.types['type']['name'];
    this.id = this.details.id;
    this.name = this.capitalizeWord(this.details.name);
    let imgs: any = this.details['sprites'];
    this.imgUrl = imgs['other']['official-artwork']['front_default'];
  }


  /**
   * When the user is in detail view, this function selects the next Pokemon either from the allPokemon array or the
   * favorites array.
   */
  nextPokemon() {
    if (this.router.url === '/pokemon' || this.router.url === '/') {
      this.getNextPokemonFromAllPokemon();
    }
    if (this.router.url === '/favorites') {
      this.getNextPokemonFromFavorites();
    }
  }


  /**
   * This function selects the next pokemon from the allPokemon array. The index of the next pokemon equals the value
   * of the id of the current pokemon. If the next Pokemon has not been loaded yet, the first pokemon of the allPokemon
   * array is selected. The new Pokemon is subscribed to get the details of the new/next Pokemon.
   */
  getNextPokemonFromAllPokemon() {
    let index = this.details.id;
    if (index > this.allPokemon.length - 1) {
      index = 0;
    }
    let newPokemon = new Pokemon(this.allPokemon[index]);
    this.subscribeToNewPokemon(newPokemon);
  }


  /**
   * This function selects the next Pokemon from the favorites array. This is achieved by searching the array for the name
   * of the current pokemon, getting the index of that pokemon at the favorites array and adding plus one to it. The new
   * index is used to get the next pokemon from the favorites array. The new Pokemon is subscribed to get the details of
   * the new/next Pokemon.
   */
  getNextPokemonFromFavorites() {
    this.favorites.forEach(pokemon => {
      if (pokemon.name === this.details.name) {
        let index = this.favorites.indexOf(pokemon) + 1;
        if (index > this.favorites.length - 1) {
          index = 0;
        }
        let newPokemon = new Pokemon(this.favorites[index]);
        this.subscribeToNewPokemon(newPokemon);
      }
    });
  }


  /**
   * When the user is in detail view, this function selects the previous Pokemon either from the allPokemon array or the
   * favorites array.
   */
  previousPokemon() {
    if (this.router.url === '/pokemon' || this.router.url === '/') {
      this.getPreviousPokemonFromAllPokemon();
    }
    if (this.router.url === '/favorites') {
      this.getPreviousPokemonFromFavorites();
    }
  }


  /**
  * This function selects the previous pokemon from the allPokemon array. The index of the next pokemon equals the value
  * of the id of the current pokemon minus 2. The new Pokemon is subscribed to get the details of the new/previous Pokemon.
  */
  getPreviousPokemonFromAllPokemon() {
    let newPokemon = new Pokemon(this.allPokemon[this.details.id - 2]);
    this.subscribeToNewPokemon(newPokemon);
  }


    /**
   * This function selects the previous Pokemon from the favorites array. This is achieved by searching the array for the name
   * of the current pokemon, getting the index of that pokemon at the favorites array and subtracting 1 of it. The new
   * index is used to get the next pokemon from the favorites array. If the new index is lower than 0, the last pokemon
   * of the array is picked. The new Pokemon is subscribed to get the details of the new/previous Pokemon.
   */
  getPreviousPokemonFromFavorites() {
    this.favorites.forEach(pokemon => {
      if (pokemon.name === this.details.name) {
        let index = this.favorites.indexOf(pokemon) - 1;
        if (index < 0) {
          index = this.favorites.length - 1;
        }
        let newPokemon = new Pokemon(this.favorites[index]);
        this.subscribeToNewPokemon(newPokemon);
      }
    });
  }


  /**
   * This function subscribes to the new Pokemon when you select a previous or the next pokemon of your array. It sets
   * the details accordingly and checks if the Pokemon is already a favorite.
   */
  subscribeToNewPokemon(newPokemon: Pokemon) {
    this.http
      .get<any>(newPokemon.url)
      .subscribe(data => {
        this.details = new Details(data);
        this.getDetails();
        this.checkIfPokemonIsFavorite();
      });
  }


  /**
   * When a key is pressed, a defined event is triggered.
   */
  @HostListener('document:keydown', ['$event'])

  /**
   * The function chekcs which key is currently pressed, and selects functions to run accordingly.
   */
  handleKeyEvent(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
      this.previousPokemon();
    }
    if (event.key === 'ArrowRight') {
      this.nextPokemon();
    }
  }


  /**
   * The function sets the newFavoritePokemon variable to the currently selected Pokemon. It then checks if the current
   * Pokemon is already part of the favorites array. If the pokemon isn´t part, it is added to the global favorites array
   * by using the addFavorites function of the favorites service. The alreadyFavorite variable is set to true (heart icon
   * at detail card changes) and the favorites array is saved at the localStorage.
   */
  addToFavorites() {
    let newFavoritePokemon = new Pokemon(this.allPokemon[this.details.id - 1]);
    if (!this.favorites.some(pokemon => pokemon.name === newFavoritePokemon.name)) {
      this.favoritesData.addFavorites(newFavoritePokemon);
      this.alreadyFavorite = true;
      let serializedArray = JSON.stringify(this.favorites);
      localStorage.setItem('favorite-pokemon', serializedArray);
    }
  }


  /**
   * The function selects the next Pokemon of the favorites array, before it removes the current pokemon from the
   * favorites array by using the removeFavorites function of the favorites service. It sets the alreadyFavorite variable
   * to false (the heart icon at the details variable changes) and the favorites array is saved at the localStorage.
   * If the favorites array is empty, the detail view dialog is closed.
   */
  removeFromFavorites() {
    this.nextPokemon();
    this.favoritesData.removeFavorites(this.details);
    this.alreadyFavorite = false;
    let serializedArray = JSON.stringify(this.favorites);
    localStorage.setItem('favorite-pokemon', serializedArray);
    if (this.favorites.length == 0) {
      this.dialogRef.close()
    }
  }


  /**
   * The Function checks if the current Pokemon is already a favorite by checking if some Pokemon of the favorites array
   * has the same name. If it is already favorite the alreadyFavorite variable is set to true to change the favorite symbol
   * at the detail view dialog. If it is no favorite it sets the alreadyFavorite variable to false.
   */
  checkIfPokemonIsFavorite() {
    if (this.favorites && this.favorites.some(pokemon => pokemon.name === this.details.name)) {
      this.alreadyFavorite = true;
    } else {
      this.alreadyFavorite = false;
    }
  }


  /**
   * The function sanitizes a selected image.
   * 
   * @param imageUrl - Image Url that is to be sanitized
   * @returns Sanitized Url
   */
  sanitizeImageUrl(imageUrl: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }
}
