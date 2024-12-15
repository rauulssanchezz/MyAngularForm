import { Component } from '@angular/core';
import { AuthService, User } from '../../../servicios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-data',
  standalone: true,
  imports: [],
  templateUrl: './profile-data.component.html',
  styleUrl: './profile-data.component.css'
})
export class ProfileDataComponent {
  private user: User | null = null;
  userName: string = '';
  gmail: string = '';

  constructor(private _userService: AuthService, private router: Router) {}

  singOut(){
    this._userService.setUser(null);
    localStorage.setItem('user', '');
    localStorage.setItem('loggedIn', 'false');
    this._userService.setLoggedIn(false);
    this.router.navigate(['']);
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userName = this.user?.user_name || '';
    this.gmail = this.user?.gmail || '';
    console.log(this.user);
  }
}
