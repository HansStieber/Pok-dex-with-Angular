import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Details } from '../models/details.class';
import { MatDialog } from '@angular/material/dialog';
import { DetailViewComponent } from '../detail-view/detail-view.component';
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
  id!: number;
  types: any;
  type!: string;
  imgUrl!: string;


  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private sanitizer: DomSanitizer
  ) { }


  /**
   * This function runs when the component gets initialized. It subscribes to the url of a certain pokemon and
   * sets the details variable as the data that is provided by that url.
   */
  async ngOnInit() {
    this.http
      .get<any>(this.url)
      .subscribe(data => {
        this.details = new Details(data);
        this.getDetails();
      });
  }


  /**
   * This function sets the detail variables of the pokemon that is currently viewed in detail view.
   */
  getDetails() {
    this.types = this.details.types;
    this.type = this.types[0]['type']['name'];
    this.id = this.details.id;
    this.name = this.capitalizeWord(this.details.name);
    let imgs: any = this.details['sprites'];
    this.imgUrl = imgs['other']['official-artwork']['front_default'];
  }


  /**
   * This function Capitalizes a word with the CapitalizeService.
   */
  capitalizeWord(word: string) {
    const capitalizeService = new CapitalizeService();
    return capitalizeService.capitalizedWord(word);
  }


  /**
   * The function sanitizes a selected image.
   * 
   * @param imageUrl - Image Url that is to be sanitized
   * @returns Sanitized Url
   */
  sanitizeImageUrl(imageUrl: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }


  /**
   * The function opens the detail view dialog. It also sets the details variable of the dialog to the values
   * of the the details of the pokemon that was selected for opening at the detail view dialog.
   */
  openDialog() {
    const dialog = this.dialog.open(DetailViewComponent);
    dialog.componentInstance.details = new Details(this.details.toJSON());
  }
}
