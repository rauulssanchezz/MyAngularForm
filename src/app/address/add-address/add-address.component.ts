import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddressService } from '../../servicios/address.service';
import { AuthService, User } from '../../servicios/auth.service';
import { Router } from '@angular/router';

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
  invalid: boolean[] = [];
  private _user: User | null = null;
  private user_id: number | null = null;
  errorMessages: string[] = ['','','','',''];


  constructor(private _addressService: AddressService, private _router: Router) {}

  ngOnInit(): void {
    this._user = JSON.parse(localStorage.getItem('user') || '{}');
    this.user_id =this._user!.id;
    console.log('Usuario: ',this.user_id);
  }

  onSubmit() {
    this.invalid = [false, false, false, false, false]
    if(this.country == ''){
      this.invalid[0] = true;
      this.errorMessages[0] = 'El campo no puede quedar vacío';
    }

    if(this.city == ''){
      this.invalid[1] = true;
      this.errorMessages[1] = 'El campo mo puede quedar vacío';
    }

    if(this.street == ''){
      this.invalid[3] = true;
      this.errorMessages[3] = 'El campo no puede quedar vacío';
    }

    if(this.house == null){
      this.invalid[4] = true;
      this.errorMessages[4] = 'El campo no puede quedar vacío';
    }

    if(this.postal == null){
      this.invalid[2] = true;
      this.errorMessages[2] = 'El campo no puede quedar vacío';
    }else if(this.postal.toLocaleString().length < 5){
      console.log(this.postal.toLocaleString())
      this.invalid[2] = true;
      this.errorMessages[2] = 'No es un código postal válido';
    }

    if(!this.invalid[0] && !this.invalid[1] && !this.invalid[2] && !this.invalid[3] && !this.invalid[4]){
      this.createAddress()
    }

  }

  createAddress(){
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
        console.log('Dirección creada con éxito: ',res);
        this._router.navigate(['user/profile']);
      },
      (err) => {
        console.log('Error en la creación de la dirección: ',err);
      }
    );
  }
}
