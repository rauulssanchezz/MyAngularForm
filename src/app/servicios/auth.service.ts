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
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _apiUrl: string = 'http://localhost:3000/api/users';
  private usersSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  private currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  user: User | null = null;
  private loggedIn: boolean = JSON.parse(localStorage.getItem('loggedIn') || 'false');

  constructor(private _http: HttpClient) {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if(user != '' && user != null && user != 'null'){
    this.currentUserSubject.next(user);
    }
  }

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

  userExists(gmail: string){
    return this._http.get(`${this._apiUrl}/gmail/${gmail}`);
  }

  getUsersSubject():Observable<User[]>{
    return this.usersSubject.asObservable();
  }

  getUserByCredentials(gmail: string, password: string): Observable<User | null> {
    const params = { gmail, password };
    return this._http.get<User | null>(`${this._apiUrl}/login`, { params });
  }


  getUser():Observable<User | null>{
    return this.currentUserSubject.asObservable();
  }

  setUser(user: User | null):void{
    this.currentUserSubject.next(user);
  }

  getLoggedIn():boolean{
    return this.loggedIn;
  }

  setLoggedIn(loggedIn:boolean):void{
    this.loggedIn = loggedIn;
  }

  setCurrentUser(user: User):void{
    this.currentUserSubject.next(user);
  }

}
