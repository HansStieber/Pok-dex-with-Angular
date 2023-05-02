import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class SearchService {

    private searchSource = new BehaviorSubject<string>('');
    currentSearch = this.searchSource.asObservable();


    constructor() {}


    /**
     * The function changes the searchSource variable to the current search.
     * 
     * @param search - Value of the current search
     */
    changeSearch(search: string) {
        this.searchSource.next(search);
    }
}