import { Component } from '@angular/core';
import { SearchBoxComponent } from "../../shared/search-box/search-box.component";

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [SearchBoxComponent],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent {

}
