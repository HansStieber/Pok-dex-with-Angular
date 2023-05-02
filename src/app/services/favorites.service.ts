import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Pokemon } from "../models/pokemon.class";
import { Details } from "../models/details.class";

@Injectable()
export class FavoritesService {

    private favoritesSource = new BehaviorSubject<Pokemon[]>([]);
    favorites = this.favoritesSource.asObservable();


    constructor() {}


    /**
     * The function changes the current favoritesSources to new favorites.
     * 
     * @param favorites - New Favorites
     */
    changeFavorites(favorites: Pokemon[]) {
        this.favoritesSource.next(favorites);
    }


    /**
     * The function adds a new Pokemon to the favoritesSources.
     * 
     * @param pokemon - Pokemon that is added
     */
    addFavorites(pokemon: Pokemon) {
        this.favoritesSource.next(this.favoritesSource.getValue().concat(pokemon));
    }


    /**
     * The function removes a Pokemon from the favorites array.
     * 
     * @param details - Details of the pokemon that is to be removed
     */
    removeFavorites(details: Details) {
        const currentFavorites = this.favoritesSource.getValue();
        const index = currentFavorites.findIndex(p => p.name === details.name);
        if (index !== -1) {
            currentFavorites.splice(index, 1);
            this.favoritesSource.next(currentFavorites);
        }
    } 
}