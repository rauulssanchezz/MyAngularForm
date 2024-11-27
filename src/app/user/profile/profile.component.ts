import { Component } from '@angular/core';
import { User, UserService } from '../../servicios/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  private user: User | null = null;
  userName: string = '';
  gmail: string = '';

  constructor(private _userService: UserService) {}

  ngOnInit(): void {
    this._userService.getUser().subscribe(user => {
      if(user){
        this.user = user;
        this.userName = this.user.getName();
        this.gmail = this.user.gmail;
      }else{
        console.log('No hay usuario');
      }
    })

  }

}
