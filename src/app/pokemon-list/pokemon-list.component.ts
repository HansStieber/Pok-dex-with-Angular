import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from '../models/pokemon.class';

@Component({
  selector: 'app-root',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent {
  title = 'poke-api';
  pokemon: Pokemon[] = [];
  BASE_URL: string = 'https://pokeapi.co/api/v2/pokemon/';
  API_URL = '';
  next = '';
  value = '';

  
  constructor(private http: HttpClient) {
    this.API_URL = this.BASE_URL + this.next;
  }


  ngOnInit() {
    this.http
      .get<any>(this.API_URL)
      .subscribe(data => {
        this.pokemon = data['results'];
        this.next = data['next'];
        console.log(this.pokemon);
        console.log(this.next);
      });
  }
}