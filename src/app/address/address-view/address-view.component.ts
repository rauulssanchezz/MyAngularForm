import { Component, Input } from '@angular/core';
import { Address } from '../../servicios/address.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-address-view',
  standalone: true,
  imports: [NgIf],
  templateUrl: './address-view.component.html',
  styleUrl: './address-view.component.css'
})
export class AddressViewComponent {
  @Input()
  public address: Address | null = null;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log('AddressViewComponent: ',this.address);
  }
}
