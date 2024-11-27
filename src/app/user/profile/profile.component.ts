import { Component, SimpleChanges } from '@angular/core';
import { User, UserService } from '../../servicios/user.service';
import { Router } from '@angular/router';

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

  constructor(private _userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this._userService.getUser().subscribe(user => {
      if(user){
        this.user = user;
        this.userName = this.user.user_name;
        this.gmail = this.user.gmail;
      }else{
        console.log('No hay usuario');
      }
    })
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this._userService.getUser().subscribe(user => {
      if(user){
        this.user = user;
        this.userName = this.user.user_name;
        this.gmail = this.user.gmail;
      }else{
        console.log('No hay usuario');
      }
    })
  }

  ngAfterContentChecked(): void {
    //Called after every check of the component's or directive's content.
    //Add 'implements AfterContentChecked' to the class.
    this._userService.getUser().subscribe(user => {
      if(user){
        this.user = user;
        this.userName = this.user.user_name;
        this.gmail = this.user.gmail;
      }else{
        console.log('No hay usuario');
      }
    })
  }

  singOut(){
    this._userService.setUser(null);
    localStorage.setItem('user', '');
    localStorage.setItem('loggedIn', 'false');
    this._userService.setLoggedIn(false);
    this.router.navigate(['']);
  }

}
