import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Pokemon } from "../models/pokemon.class";
import { Details } from "../models/details.class";

@Injectable()
export class FavoritesService {

    private favoritesSource = new BehaviorSubject<Pokemon[]>([]);
    favorites = this.favoritesSource.asObservable();

    constructor() {}

    changeFavorites(favorites: Pokemon[]) {
        this.favoritesSource.next(favorites);
    }

    addFavorites(pokemon: Pokemon) {
        this.favoritesSource.next(this.favoritesSource.getValue().concat(pokemon));
    }

    removeFavorites(details: Details) {
        const currentFavorites = this.favoritesSource.getValue();
        console.log(currentFavorites)
        const index = currentFavorites.findIndex(p => p.name === details.name);
        if (index !== -1) {
            currentFavorites.splice(index, 1);
            this.favoritesSource.next(currentFavorites);
        }
    } 
}