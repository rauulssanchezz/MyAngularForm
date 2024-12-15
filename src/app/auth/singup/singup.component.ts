import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService, User } from '../../servicios/auth.service';
import { Router } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { catchError, map, Observable, of } from 'rxjs';

@Component({
  selector: 'app-singup',
  standalone: true,
  imports: [FormsModule, NgIf, NgClass],
  templateUrl: './singup.component.html',
  styleUrl: './singup.component.css'
})
export class SingupComponent {

  name: string = '';
  gmail: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessages: string[] = [];
  invalid: boolean[] = [];

  constructor(private _userService : AuthService, private router: Router) {}

  saveFormValues() {
    console.log({
      name: this.name,
      gmail: this.gmail,
      password: this.password,
    });
  }

  private userExists(gmail: string): Observable<boolean> {
    return this._userService.userExists(gmail).pipe(
        map(() => true),
        catchError((error) => {
            if (error.status === 404) {
                return of(false);
            }
            console.error('Error verificando usuario:', error);
            return of(false);
        })
    );
}



  async createUser(){

    this.invalid = [false,false,false,false];
    this.errorMessages = [
      'El campo nombre no puede estar vacío',
      'El campo gmail no puede estar vacío',
      'El campo password no puede estar vacío',
      'El campo confirmar password no puede estar vacío'
    ];

    this.userExists(this.gmail).subscribe((exists: boolean) => {
      if (exists) {
          this.invalid[1] = true;
          this.errorMessages[1] = 'El correo ya está registrado';
      } else {
      }
  });

    if(this.name == ''){
      this.invalid[0] = true;
    }

    if(this.gmail == ''){
      this.invalid[1] = true;
      this.errorMessages[1] = 'El campo gmail no puede estar vacío'
    }else if(!this.gmail.includes('@gmail.com')){
      this.invalid[1] = true;
      this.errorMessages[1] = 'No es un formato de correo válido';

    }

    if(this.password == ''){
      this.invalid[2] = true;

    }else if(this.password.length < 5){
      this.errorMessages[2] = 'La contraseña debe tener al menos 8 caracteres';
      this.invalid[2] = true;
    }else if(this.password != this.confirmPassword){
      this.errorMessages[2] = 'Las contraseñas no coinciden';
      this.errorMessages[3] = 'Las contraseñas no coinciden';
      this.invalid[3] = true;
    }

    if(this.invalid[0] || this.invalid[1] || this.invalid[2]){
      return;
    }

    this._userService.createUser(this.name, this.gmail, this.password).subscribe(
      (res) => {
        console.log('Usuario creado con éxito: ',res);
        this.router.navigate(['auth/login']);
      },
      (err) => {
        console.log('Error en la creación del usuario: ',err);
      }
    );
  }
}
