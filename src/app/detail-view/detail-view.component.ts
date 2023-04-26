import { Component, HostListener, OnInit } from '@angular/core';
import { Details } from '../models/details.class';
import { PokemonService } from '../services/pokemon.service';
import { Pokemon } from '../models/pokemon.class';
import { HttpClient } from '@angular/common/http';
import { FavoritesService } from '../services/favorites.service';

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.scss']
})
export class DetailViewComponent implements OnInit {
  details!: Details;
  allPokemon: Pokemon[] = [];
  types: any;
  type!: string;
  id!: number;
  favorites: Pokemon[] = [];
  currentPokemon: Pokemon | undefined;
  alreadyFavorite: boolean = false;

  constructor(private http: HttpClient, private data: PokemonService, private favoritesData: FavoritesService) { }

  ngOnInit(): void {
    this.data.pokemon.subscribe(pokemon => {
      this.allPokemon = pokemon;
    });
    this.favoritesData.favorites.subscribe(favorites => {
      this.favorites = favorites;
    });
    this.types = this.details.types[0];
    this.type = this.types['type']['name'];
    this.id = this.details.id;
    this.checkIfPokemonIsFavorite();
  }


  nextPokemon() {
    let newPokemon = new Pokemon(this.allPokemon[this.details.id]);
    this.http
      .get<any>(newPokemon.url)
      .subscribe(data => {
        this.details = new Details(data);
        this.types = this.details.types[0];
        this.type = this.types['type']['name'];
        this.id = this.details.id;
        this.checkIfPokemonIsFavorite();
      });
  }

  previousPokemon() {
    let newPokemon = new Pokemon(this.allPokemon[this.details.id - 2]);
    this.http
      .get<any>(newPokemon.url)
      .subscribe(data => {
        this.details = new Details(data);
        this.types = this.details.types[0];
        this.type = this.types['type']['name'];
        this.id = this.details.id;
        this.checkIfPokemonIsFavorite();
      });
  }

  @HostListener('document:keydown', ['$event'])

  handleKeyEvent(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
      this.previousPokemon();
    }
    if (event.key === 'ArrowRight') {
      this.nextPokemon();
    }
  }


  addToFavorites() {
    let newFavoritePokemon = new Pokemon(this.allPokemon[this.details.id - 1]);
    if (!this.favorites.some(pokemon => pokemon.name === newFavoritePokemon.name)) {
      this.favoritesData.addFavorites(newFavoritePokemon);
      this.alreadyFavorite = true;
      let serializedArray = JSON.stringify(this.favorites);
      localStorage.setItem('favorite-pokemon', serializedArray);
    }

  }


  removeFromFavorites() {
    this.favoritesData.removeFavorites(this.details);
    this.alreadyFavorite = false;
    let serializedArray = JSON.stringify(this.favorites);
    localStorage.setItem('favorite-pokemon', serializedArray);
  }


  checkIfPokemonIsFavorite() {
    if (this.favorites.some(pokemon => pokemon.name === this.details.name)) {
      this.alreadyFavorite = true;
    } else {
      this.alreadyFavorite = false;
    }
  }
}
