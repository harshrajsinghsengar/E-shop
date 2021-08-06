import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from 'src/app/services/user/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    
  error : string ;
  success : string;
  form : HTMLFormElement

  constructor(private userAService : UserService, private router : Router) { }

  ngOnInit(): void {
  }

login(event : Event){
  event.preventDefault();
  this.form = <HTMLFormElement>event.target
  this.readFormValues();
}

navigateToHomePage(){
this.router.navigate([''])
}

readFormValues(){
let email = (<HTMLInputElement>this.form.elements.namedItem('email')).value
let password = (<HTMLInputElement>this.form.elements.namedItem('password')).value
}


this.UserService.login(credentials)
.subscribe(
  {
    next : (result)=>{
      console.log(result );
      this.success = result.message
      this.error = undefined
      this.navigateToHomePage()
    } , 
    error : (response : HttpErrorResponse)=>{
      console.log(response.error);
      this.success = undefined
      this.error = response.error.error.message
    }
  }
)

}
