import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export class Address{
  id:number;
  userId: number;
  country: string;
  house: number;
  city: string;
  street: string;
  pc: number;

  constructor(id: number,userId: number, country: string, city: string, pc: number, street: string, house: number){
    this.id = id;
    this.userId = userId;
    this.country = country;
    this.city = city;
    this.pc = pc;
    this.street = street;
    this.house = house;
}
}

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private apiUrl: string = 'http://localhost:3000/api/address';
  private addressSubject: BehaviorSubject<Address[]> = new BehaviorSubject<Address[]>([]);
  address: Address[] = [];

  constructor(private _httpClient: HttpClient) { }

  createAddres(user_id: number, country: string, city: string, pc: number, street: string, house: number){
    const newAddress = {
      user_id: user_id,
      country: country,
      city: city,
      pc: pc,
      street: street,
      house: house
    }

    return this._httpClient.post(this.apiUrl,newAddress);
  }
}
