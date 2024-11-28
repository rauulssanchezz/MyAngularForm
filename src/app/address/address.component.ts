import { Component } from '@angular/core';
import { AddressViewComponent } from './address-view/address-view.component';
import { Router } from '@angular/router';
import { Address, AddressService } from '../servicios/address.service';
import { User } from '../servicios/auth.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [AddressViewComponent, NgFor],
  templateUrl: './address.component.html',
  styleUrl: './address.component.css'
})
export class AddressComponent {

  addresses: Address[] = [];
  private _user: User | null = null;
  private user_id: number | null = null

  constructor(private router: Router, private _addressService: AddressService) { }

  ngOnInit(): void {
    this._user = JSON.parse(localStorage.getItem('user') || '{}');
    this.user_id =parseInt(this._user!.user_name);
    this.loadAddresses();
  }

  addAddress(){
    this.router.navigate(['profile/add-address']);
  }

  loadAddresses(){

    this._addressService.loadAddresses(this.user_id!).subscribe({
      next: (addresses) => {
        this.addresses = addresses;
        console.log('Direcciones cargadas: ',this.addresses);
      },
      error: (err) => {
        console.log('Error al cargar las direcciones: ',err);
      }
    });
  }
}
