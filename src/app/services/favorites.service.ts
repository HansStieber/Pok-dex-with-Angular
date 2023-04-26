import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Pokemon } from "../models/pokemon.class";

@Injectable()
export class FavoritesService {

    private favoritesSource = new BehaviorSubject<Pokemon[]>([]);
    favorites = this.favoritesSource.asObservable();

    constructor() {}

    changeFavorites(pokemon: Pokemon) {
        this.favoritesSource.next(this.favoritesSource.getValue().concat(pokemon));
    }
}