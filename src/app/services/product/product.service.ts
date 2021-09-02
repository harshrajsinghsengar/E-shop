import { Product } from './../../models/products';
import { map } from 'rxjs/operators';
import { UserService } from 'src/app/services/user/user.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  getAllProductUrl = 'http://localhost/api/products';
  constructor(private http: HttpClient, private userService: UserService) {}

  getAllProducts() {
    return this.http
      .get(this.getAllProductUrl, {
        headers: {
          authorization: this.userService.getToken(),
        },
      })
      .pipe(
        map((result: { count: number; products: Product[] }) => {
          return result.products;
        })
      );
  }

  getProductById(id: string) {
    return this.http.get(`${this.getAllProductUrl}/${id}`).pipe(
      map((result) => {
        return <Product>result;
      })
    );
  }
}
