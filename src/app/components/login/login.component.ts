import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from 'src/app/services/user/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  [x: string]: any;
  credentials: { email: string; password: string } = {
    email: '',
    password: '',
  };
  error: string;
  success: string;
  form: HTMLFormElement;
  returnUrl: string;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params: ParamMap) => {
      this.returnUrl = params.get('returnUrl');
    });
  }

  login(event: Event) {
    event.preventDefault();
    this.form = <HTMLFormElement>event.target;
    //console.log(this.form);

    this.readFormValues();

    this.userService.login(this.credentials).subscribe({
      next: (result) => {
        //console.log(result);
        this.success = result.message;
        this.error = undefined;
        this.navigateToHomePage();
      },
      error: (response: HttpErrorResponse) => {
        console.log(response.error);
        this.success = undefined;
        this.error = response.error.error.message;
      },
    });
  }

  navigateToHomePage() {
    let url = this.returnUrl ? this.returnUrl : '/';
    this.router.navigateByUrl(url);
  }

  readFormValues() {
    let email = (<HTMLInputElement>this.form.elements.namedItem('email')).value;
    let password = (<HTMLInputElement>this.form.elements.namedItem('password'))
      .value;

    this.credentials = {
      email,
      password,
    };
  }
}
