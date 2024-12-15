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


}
