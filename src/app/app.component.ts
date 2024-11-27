import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { UserService } from './servicios/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'MyAnimalShop';
  loggedInString: string | null = localStorage.getItem('loggedIn');
  private loggedIn: boolean = false;

  constructor(private _userService: UserService){}

}
