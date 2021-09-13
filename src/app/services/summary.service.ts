import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { UserService } from './user/user.service';
import { Summary } from '../models/summary';

@Injectable({
  providedIn: 'root',
})
export class SummaryService {
  url = 'http://localhost/api/summary';

  constructor(private http: HttpClient, private userService: UserService) {}

  getSummary() {
    let headers = new HttpHeaders({
      authorization: this.userService.getToken(),
    });
    return this.http.get(this.url, { headers }).pipe(
      map((result) => {
        return <Summary>result;
      })
    );
  }
}
