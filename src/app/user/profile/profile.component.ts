import { Component, SimpleChanges } from '@angular/core';
import { AuthService, User } from '../../servicios/auth.service';
import { Router } from '@angular/router';

import { ProfileDataComponent } from "./profile-data/profile-data.component";
import { AddressComponent } from '../../address/address.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [AddressComponent, ProfileDataComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  constructor(private _userService: AuthService, private router: Router) {}

  singOut(){
    this._userService.setUser(null);
    localStorage.setItem('user', '');
    localStorage.setItem('loggedIn', 'false');
    this._userService.setLoggedIn(false);
    this.router.navigate(['']);
  }
}
