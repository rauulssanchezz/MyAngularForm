import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


export class User{
  id: number;
  name: string;
  gmail: string;
  password: string;

  constructor(id:number,name:string,gmail:string,password:string){
    this.id = id;
    this.name = name;
    this.gmail = gmail;
    this.password = password;
  }

  getId(){
    return this.id;
  }

  getName(){
    return this.name;
  }

  getGmail(){
    return this.gmail;
  }

  getPassword(){
    return  this.password;
  }

  setName(newName: string){
    this.name = newName;
  }

  setGmail(newGmail: string){
    this.gmail = newGmail;
  }

  setPassword(newPassword: string){
    this.password = newPassword;
  }

}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _apiUrl: string = 'http://localhost:3000/api/users';
  private usersSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  private user: User = new User(0,'','','');

  constructor(private _http: HttpClient) { }

  createUser(name:string,gmail:string,password:string):Observable<any>{
    const newUser = {
      name: name,
      gmail: gmail,
      password: password
    }
    return this._http.post(this._apiUrl,newUser)
  }


  getUsers():void{
    this._http.get(this._apiUrl).subscribe(
      (res) => {
        this.usersSubject.next(res as User[]);
        console.log('Usuarios: ',res);
      },
      (err) => {
        console.log('Error en la obtención de los usuarios: ',err);
      }
    );
  }

  getUsersSubject():Observable<User[]>{
    return this.usersSubject.asObservable();
  }

  getUserByCredentials(gmail:string,password:string):void {

    const credentials = {gmail, password};
    const params = new URLSearchParams(credentials as Record<string, string>).toString();

     this._http.get(`${this._apiUrl}/login?${params}`).subscribe(
        (res) => {
          this.user = res as User;
          console.log('Usuario: ',this.user);
        },
        (err) => {
          console.log('Error en la obtención del usuario: ',err);
        }
      );
  }


  getUser():User{
    return this.user;
  }

  setUser(user:User):void{
    this.user = user;
  }
}
