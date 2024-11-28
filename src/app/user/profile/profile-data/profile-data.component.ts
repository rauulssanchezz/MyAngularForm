import { Component } from '@angular/core';
import { AuthService, User } from '../../../servicios/auth.service';

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

  constructor(private _userService: AuthService) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userName = this.user?.user_name || '';
    this.gmail = this.user?.gmail || '';
    console.log(this.user);
  }
}
