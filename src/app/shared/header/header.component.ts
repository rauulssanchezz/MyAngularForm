import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '../../servicios/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(public userService: UserService) { }

}
