import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-singup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './singup.component.html',
  styleUrl: './singup.component.css'
})
export class SingupComponent {

  name: string = '';
  gmail: string = '';
  password: string = '';
  postalCode: string = '';
  country: string = '';
  city: string = '';
  street: string = '';
  houseNumber: string = '';

  saveFormValues() {
    console.log({
      name: this.name,
      gmail: this.gmail,
      password: this.password,
      country: this.country,
      city: this.city,
      postalCode: this.postalCode,
      street: this.street,
      houseNumber: this.houseNumber
    });
  }

}
