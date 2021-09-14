import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user/user.service';

@Injectable({
  providedIn: 'root',
})
export class HeaderInterceptorService implements HttpInterceptor {
  constructor(private userService: UserService, private router: Router) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let header = req.headers.set('authorization', this.userService.getToken());
    let r = req.clone({
      headers: header,
    });
    return next.handle(r);
  }
}
