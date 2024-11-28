import { Component } from '@angular/core';
import { AddAddressComponent } from "./add-address/add-address.component";
import { AddressViewComponent } from './address-view/address-view.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [AddressViewComponent],
  templateUrl: './address.component.html',
  styleUrl: './address.component.css'
})
export class AddressComponent {

  constructor(private router: Router) { }

  addAddress(){
    this.router.navigate(['profile/add-address']);
  }

}
