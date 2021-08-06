import { User } from './../../models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {


private userSignupUrl = "http://localhost/api/users/signup";
private userLoginUrl = "http://localhost/api/users/login";

  constructor(private http : HttpClient) { }

  signup(user : User){
    return this.http.post(this.userSignupUrl , user)
    .pipe(
      map(result=>{
         return <{message : string}>result
      })
    )
 }

  login(credentials :{email : string, password : string}){
   return this.http.post(this.userLoginUrl, credentials)
   .pipe(
     map(result=>{
       return <loginResponse>result
    })
)
}

}

interface loginResponse{
  token : string , 
  message : string
}