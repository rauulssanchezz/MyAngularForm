import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddressService } from '../../servicios/address.service';
import { AuthService, User } from '../../servicios/auth.service';

@Component({
  selector: 'app-add-address',
  standalone: true,
  imports: [FormsModule, NgClass, NgIf],
  templateUrl: './add-address.component.html',
  styleUrl: './add-address.component.css'
})
export class AddAddressComponent {
  country: string = '';
  city: string = '';
  street: string = '';
  house: number | null = null;
  postal: number | null = null;
  invalid: boolean = false;
  private _user: User | null = null;
  private user_id: number | null = null;

  constructor(private _addressService: AddressService, private _userService: AuthService) {}

  ngOnInit(): void {
    this._user = JSON.parse(localStorage.getItem('user') || '{}');
    this.user_id =this._user!.id;
    console.log('Usuario: ',this.user_id);
  }

  onSubmit() {
    if (this.country == '' || this.city == '' || this.street == '' || this.house == null || this.postal == null) {
      this.invalid = true;
    } else {
      console.log({
        country: this.country,
        city: this.city,
        street: this.street,
        house: this.house,
        postal: this.postal
      });
      this._addressService.createAddres(
        this.user_id!,
        this.country,
        this.city,
        this.postal,
        this.street,
        this.house
      ).subscribe(
        (res) => {
          console.log('Usuario creado con éxito: ',res);
        },
        (err) => {
          console.log('Error en la creación del usuario: ',err);
        }
      );
    }
  }
}
