import { Component } from '@angular/core';
import { ProductListComponent } from "../product-list/product-list.component";

@Component({
  selector: 'app-home',
  imports: [ProductListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
