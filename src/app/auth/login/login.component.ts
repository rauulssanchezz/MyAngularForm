import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { UserService, User } from '../../servicios/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  gmail: string = '';
  password: string = '';
  private user: User = new User(0,'','','');

  constructor(private _userService: UserService, private _router: Router){}

  ngOnInit(): void {

    this.user = this._userService.getUser();

    if(this.user.getId() != 0){
      this._router.navigate(['shop/products-list']);
    }

  }

  async login(){
    this._userService.getUserByCredentials(this.gmail,this.password);
    this.user = this._userService.getUser();
    if(this.user.getId() != 0){
      this._router.navigate(['']);
    }
  }

}
