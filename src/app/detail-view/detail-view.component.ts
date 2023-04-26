import { Component, HostListener, OnInit } from '@angular/core';
import { Details } from '../models/details.class';
import { PokemonService } from '../services/pokemon.service';
import { Pokemon } from '../models/pokemon.class';
import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient, private data: PokemonService) { }

  ngOnInit(): void {
    this.data.pokemon.subscribe(pokemon => {
      this.allPokemon = pokemon;
    });
    this.types = this.details.types[0];
    this.type = this.types['type']['name'];
    this.id = this.details.id
    console.log('details from detail-view', this.details)
  }


  nextPokemon() {
    let newPokemon = this.allPokemon[this.details.id];
    this.http
      .get<any>(newPokemon.url)
      .subscribe(data => {
        this.details = new Details(data);
        this.types = this.details.types[0];
        this.type = this.types['type']['name'];
        this.id = this.details.id;
      });
  }

  previousPokemon() {
    let newPokemon = this.allPokemon[this.details.id - 2];
    this.http
      .get<any>(newPokemon.url)
      .subscribe(data => {
        this.details = new Details(data);
        this.types = this.details.types[0];
        this.type = this.types['type']['name'];
        this.id = this.details.id;
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
}
