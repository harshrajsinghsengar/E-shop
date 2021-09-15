import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { NotificationService } from '../services/notification/notification.service';
import { UserService } from '../services/user/user.service';

@Injectable({
  providedIn: 'root',
})
export class HeaderInterceptorService implements HttpInterceptor {
  constructor(
    private userService: UserService,
    private router: Router,
    private message: NotificationService
  ) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let header = req.headers.set('authorization', this.userService.getToken());
    let r = req.clone({
      headers: header,
    });
    return next.handle(r).pipe(
      map((result) => {
        //  console.log(result);
        return result;
      }),
      catchError((err: HttpErrorResponse) => {
        this.showProperMessage(err);
        return throwError(err);
      }),
      finalize(() => {})
    );
  }

  showProperMessage(err: HttpErrorResponse) {
    //console.log(this.router.url);
    //console.log(err);

    if (err.url.includes('is-admin')) {
      return;
    }

    if (this.router.url.includes('login') && err.status != 401) {
      this.message.show('Invalid Email Or Password !!');
      return;
    }

    if (err.status == 401) {
      this.message.show('Session Expired. Please Login Again !!');
      this.userService.logout();
      this.router.navigate(['login'], {
        queryParams: {
          returnUrl: this.router.url,
        },
      });
      return;
    }
  }
}
