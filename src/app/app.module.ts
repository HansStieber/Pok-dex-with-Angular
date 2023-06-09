import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { PokemonComponent } from './pokemon/pokemon.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonFavoritesComponent } from './pokemon-favorites/pokemon-favorites.component';
import { DetailViewComponent } from './detail-view/detail-view.component';
import { SearchService } from './services/search.service';
import { PokemonService } from './services/pokemon.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FavoritesService } from './services/favorites.service';
import { CapitalizeService } from './services/capitalize.service';
import { StatsTabsComponent } from './stats-tabs/stats-tabs.component';
import { MatTabsModule } from '@angular/material/tabs';
import { StatComponent } from './stat/stat.component';
import { MoveComponent } from './move/move.component';
import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PokemonComponent,
    PokemonListComponent,
    PokemonFavoritesComponent,
    DetailViewComponent,
    StatsTabsComponent,
    StatComponent,
    MoveComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    MatProgressBarModule,
    MatCardModule,
    MatMenuModule,
    MatTabsModule
  ],
  providers: [
    SearchService,
    PokemonService,
    FavoritesService,
    CapitalizeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
