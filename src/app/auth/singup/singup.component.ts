import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../servicios/user.service';

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

  constructor(private _userService : UserService) {}

  saveFormValues() {
    console.log({
      name: this.name,
      gmail: this.gmail,
      password: this.password,
    });
  }

  async createUser(){

    this._userService.createUser(this.name, this.gmail, this.password).subscribe(
      (res) => {
        console.log('Usuario creado con éxito: ',res);

      },
      (err) => {
        console.log('Error en la creación del usuario: ',err);
      }
    );
  }

  async getUsers(){

      this._userService.getUserByCredentials(this.gmail, this.password);
  }

}
