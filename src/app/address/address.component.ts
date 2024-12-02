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
    console.log('Usuario: ',this._user);
    console.log('Usuario id: ',this._user!.id);
    this.user_id =this._user!.id;
    this.loadAddresses(this.user_id);
  }

  addAddress(){
    this.router.navigate(['profile/add-address']);
  }

  loadAddresses(user_id: number){

    this._addressService.loadAddresses(user_id!).subscribe({
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
