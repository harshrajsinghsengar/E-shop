import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { UserService } from './user/user.service';
import { Summary } from '../models/summary';

@Injectable({
  providedIn: 'root',
})
export class SummaryService {
  url = '/api/summary';

  constructor(private http: HttpClient, private userService: UserService) {}

  getSummary() {
    return this.http.get(this.url).pipe(
      map((result) => {
        return <Summary>result;
      })
    );
  }
}
