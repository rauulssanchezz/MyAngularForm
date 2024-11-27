import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';


export class User{
  id: number;
  user_name: string;
  gmail: string;
  user_password: string;

  constructor(id:number,user_name:string,gmail:string,user_password:string){
    this.id = id;
    this.user_name = user_name;
    this.gmail = gmail;
    this.user_password = user_password;
  }

  getId(){
    return this.id;
  }

  getName(){
    return this.user_name;
  }

  getGmail(){
    return this.gmail;
  }

  getPassword(){
    return  this.user_password;
  }

  setName(newName: string){
    this.user_name = newName;
  }

  setGmail(newGmail: string){
    this.gmail = newGmail;
  }

  setPassword(newPassword: string){
    this.user_password = newPassword;
  }

}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _apiUrl: string = 'http://localhost:3000/api/users';
  private usersSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  private currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  user: User | null = null;
  private loggedIn: boolean = false;

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

  getUserByCredentials(gmail:string,password:string):Observable<User> {

    const credentials = {gmail, password};
    const params = new URLSearchParams(credentials as Record<string, string>).toString();

    return this._http.get<User>(`${this._apiUrl}/login?${params}`).pipe(
      tap((res) => this.currentUserSubject.next(res))
    );
  }


  getUser():Observable<User | null>{
    return this.currentUserSubject.asObservable();
  }

  getLoggedIn():boolean{
    return this.loggedIn;
  }

  setLoggedIn(loggedIn:boolean):void{
    this.loggedIn = loggedIn;
  }

}
