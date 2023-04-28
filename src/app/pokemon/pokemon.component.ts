import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Details } from '../models/details.class';
import {MatDialog} from '@angular/material/dialog';
import {DetailViewComponent} from '../detail-view/detail-view.component';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CapitalizeService } from '../services/capitalize.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent {
  @Input() url!: string;
  details: Details = new Details();
  name!: any;
  types: any;
  type!: string;
  imgUrl!: string;

  
  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private sanitizer: DomSanitizer
    ) {
  }


  async ngOnInit() {
    this.http
      .get<any>(this.url)
      .subscribe(data => {
        this.details = new Details(data);
        this.name = this.capitalizeWord(this.details.name);
        this.types = this.details.types;
        this.type = this.types[0]['type']['name'];
        let imgs: any = this.details['sprites'];
        this.imgUrl = imgs['other']['official-artwork']['front_default'];
      });
  }

  capitalizeWord(word: string) {
    const capitalizeService = new CapitalizeService();
    return capitalizeService.capitalizedWord(word);
  }


  sanitizeImageUrl(imageUrl: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
}


  openDialog() {
    const dialog = this.dialog.open(DetailViewComponent);
    dialog.componentInstance.details = new Details(this.details.toJSON());
  }
}
