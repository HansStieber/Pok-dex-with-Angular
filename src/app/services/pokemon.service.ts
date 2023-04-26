import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Pokemon } from "../models/pokemon.class";

@Injectable()
export class PokemonService {

    private pokemonSource = new BehaviorSubject<Pokemon[]>([]);
    pokemon = this.pokemonSource.asObservable();

    constructor() {}

    changePokemon(pokemon: Pokemon[]) {
        this.pokemonSource.next(pokemon);
    }
}