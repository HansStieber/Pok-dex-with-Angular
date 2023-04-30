import { Component, HostListener, OnInit } from '@angular/core';
import { Details } from '../models/details.class';
import { PokemonService } from '../services/pokemon.service';
import { Pokemon } from '../models/pokemon.class';
import { HttpClient } from '@angular/common/http';
import { FavoritesService } from '../services/favorites.service';
import { Router } from '@angular/router';
import { CapitalizeService } from '../services/capitalize.service';
import { MatDialogRef } from '@angular/material/dialog';

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

  constructor(
    private dialogRef: MatDialogRef<DetailViewComponent>,
    private http: HttpClient,
    private data: PokemonService,
    private favoritesData: FavoritesService,
    private router: Router) { }

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
    this.name = this.capitalizeWord(this.details.name);
    this.checkIfPokemonIsFavorite();
  }


 capitalizeWord(word: string) {
    const capitalizeService = new CapitalizeService();
    return capitalizeService.capitalizedWord(word);
  }

  nextPokemon() {
    if (this.router.url === '/pokemon') {
      let index = this.details.id;
      if (index > this.allPokemon.length - 1) {
        index = 0;
      }
      let newPokemon = new Pokemon(this.allPokemon[index]);
      this.http
        .get<any>(newPokemon.url)
        .subscribe(data => {
          this.details = new Details(data);
          this.types = this.details.types[0];
          this.type = this.types['type']['name'];
          this.id = this.details.id;
          this.name = this.capitalizeWord(this.details.name);
          this.checkIfPokemonIsFavorite();
        });
    }
    if (this.router.url === '/favorites') {
      this.favorites.forEach(pokemon => {
        if (pokemon.name === this.details.name) {
          let index = this.favorites.indexOf(pokemon) + 1;
          if (index > this.favorites.length - 1) {
            index = 0;
          }
          let newPokemon = new Pokemon(this.favorites[index]);
          this.http
            .get<any>(newPokemon.url)
            .subscribe(data => {
              this.details = new Details(data);
              this.types = this.details.types[0];
              this.type = this.types['type']['name'];
              this.id = this.details.id;
              this.name = this.capitalizeWord(this.details.name);
              this.checkIfPokemonIsFavorite();
            });
        }
      });
    }
  }

  previousPokemon() {
    if (this.router.url === '/pokemon') {
      let newPokemon = new Pokemon(this.allPokemon[this.details.id - 2]);
      this.http
        .get<any>(newPokemon.url)
        .subscribe(data => {
          this.details = new Details(data);
          this.types = this.details.types[0];
          this.type = this.types['type']['name'];
          this.id = this.details.id;
          this.name = this.capitalizeWord(this.details.name);
          this.checkIfPokemonIsFavorite();
        });
    }
    if (this.router.url === '/favorites') {
      this.favorites.forEach(pokemon => {
        if (pokemon.name === this.details.name) {
          let index = this.favorites.indexOf(pokemon) - 1;
          if (index < 0) {
            index = this.favorites.length - 1;
          }
          let newPokemon = new Pokemon(this.favorites[index]);
          this.http
            .get<any>(newPokemon.url)
            .subscribe(data => {
              this.details = new Details(data);
              this.types = this.details.types[0];
              this.type = this.types['type']['name'];
              this.id = this.details.id;
              this.name = this.capitalizeWord(this.details.name);
              this.checkIfPokemonIsFavorite();
            });
        }
      });
    }
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
    this.nextPokemon();
    this.favoritesData.removeFavorites(this.details);
    this.alreadyFavorite = false;
    let serializedArray = JSON.stringify(this.favorites);
    localStorage.setItem('favorite-pokemon', serializedArray);
    if (this.favorites.length == 0) {
      this.dialogRef.close()
    }
  }


  checkIfPokemonIsFavorite() {
    if (this.favorites && this.favorites.some(pokemon => pokemon.name === this.details.name)) {
      this.alreadyFavorite = true;
    } else {
      this.alreadyFavorite = false;
    }
  }
}
