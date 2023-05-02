import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonFavoritesComponent } from './pokemon-favorites/pokemon-favorites.component';

const routes: Routes = [
  { path: '', component: PokemonListComponent },
  { path: 'pokemon', component: PokemonListComponent },
  { path: 'favorites', component: PokemonFavoritesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
