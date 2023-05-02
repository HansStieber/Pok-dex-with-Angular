import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Pokemon } from "../models/pokemon.class";

@Injectable()
export class PokemonService {

    private pokemonSource = new BehaviorSubject<Pokemon[]>([]);
    pokemon = this.pokemonSource.asObservable();


    constructor() {}


    /**
     * The function changes the pokemon Source variable to the given pokemon variable.
     * 
     * @param pokemon - Pokemon that are saved as pokemonSource
     */
    changePokemon(pokemon: Pokemon[]) {
        this.pokemonSource.next(pokemon);
    }
}