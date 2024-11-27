import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { UserService, User } from '../../servicios/user.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  gmail: string = '';
  password: string = '';
  private user: User | null = null;
  invalid: boolean = false;
  errorMessage: string = '';

  constructor(private _userService: UserService, private _router: Router){}

  ngOnInit(): void {

    this._userService.getUser().subscribe(user => {
      if(user){
        this.user = user;
      }
    })

    console.log(this.user);

    if(this.user != null){
      this._router.navigate(['']);
    }

  }

  async login(){

    if(this.gmail == '' || this.password == ''){
      this.invalid = true;
      this.errorMessage = 'Todos los campos son obligatorios';
      return;
    }



    this._userService.getUserByCredentials(this.gmail,this.password).subscribe(
      (res) => {
        this.user = res;
        console.log(this.user);

        if(this.user.id != 0){
          this._userService.setLoggedIn(true);
          this._router.navigate(['/user/profile']);
        }else{
          this.invalid = true;
          this.errorMessage = 'Usuario o contraseña incorrectos';
        }
      },

      (err) => {
        console.log(err);
        this.invalid = true;
        this.errorMessage = 'Usuario o contraseña incorrectos';
      }
    );
  }

}
