import { UserData } from './../../models/user-data';
import { CartItem } from './../../models/cart-item';
import { Cart } from './../../models/cart';
import { Profile } from './../../models/profile';
import { User } from './../../models/user';
import { Observable } from 'rxjs';
import { ErrorHandler } from './../../shared/error-handler';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Command, Key } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient, private router:Router) {  }
  private Url=`http://localhost:3000/`;
  _registerUrl = `${this.Url}auth/register`;
  _loginUrl = `${this.Url}auth/login`;
  _userUrl = `${this.Url}auth/current-user`;
  _profileUrl = `${this.Url}profile`;
  private _usersURL = `${this.Url}auth/system-users`;
  private _userDataURL = `${this.Url}auth/user-main-data`;

  private imageChangeUrl = `${this.Url}profile/userprofile/changeprofileimage`;
  private newImageUrl = `${this.Url}profile/userprofile/setprofileimage`;
  private contactUrl = `${this.Url}contacts/new-mail`;
  private errorHandler:ErrorHandler = new ErrorHandler();
  public currentUser:User;
  public profile:Profile;
  public cart:Cart;
  public cartItem:CartItem;
  public username:string;



  register(data:any):Observable<any>{
    try{
      return this.http.post<any>(this._registerUrl, data);
    }
    catch(error){
      this.errorHandler.handleError(error);
    }
  }

  pUserData(){
    if(this.isLoggedIn()){
      this.prepareUserData().subscribe((uData:UserData)=>{
        this.profile= uData.profile;
        this.username=`${uData.profile.firstname} ${uData.profile.lastname}`;
        this.cart=uData.cart;
        this.cartItem=uData.cartItem;
      })
      this.getCurrentUser().subscribe(resUser=>{
        this.currentUser=resUser;
      });
    }
  }
  
  login(data:any):Observable<any>{
    try{
      return this.http.post<any>(this._loginUrl, data);
    }
    catch(error){
      this.errorHandler.handleError(error);
    }
  }
  
  userLogout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  prepareUserData(): Observable<UserData>{
    try{
      return this.http.get<any>(this._userDataURL);
    }
    catch(error){
      this.errorHandler.handleError(error);
    }
  }

  getCurrentUser(){
    try{
      return this.http.get<any>(this._userUrl);
    }
    catch(error){
      this.errorHandler.handleError(error);
    }
  }

  getSystemUsers():Observable<User[]>{
    try{
      return this.http.get<any>(this._usersURL);
    }
    catch(error){
      this.errorHandler.handleError(error);
    }
  }

  messageContact(mesageForm:any):Observable<void>{
    try{
      return this.http.post<any>(this.contactUrl,mesageForm);
    }
    catch(error){
      this.errorHandler.handleError(error);
    }
  }

  getToken(){
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean{
    return !!localStorage.getItem('token');
  }

  getUserProfile():Observable<Profile>{
    try{
      return this.http.get<any>(this._profileUrl);
    }
    catch(error){
      this.errorHandler.handleError(error);
    }
  }

}
