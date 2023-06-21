import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(allPokemon: any[], search: string): any[] {
    if (!search) {
      return allPokemon;
    }

    search = search.toLowerCase();

    return allPokemon.filter(pokemon => {
      return pokemon.name.toLowerCase().includes(search);
    });
  }
}