import { Params } from '@angular/router';
import { Product } from './../../models/products';
import { map } from 'rxjs/operators';
import { UserService } from 'src/app/services/user/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  productUrl = '/api/products';
  constructor(private http: HttpClient, private userService: UserService) {}

  getAllProducts(params) {
    let query = new URLSearchParams();
    if (params['category']) {
      query.append('category', params['category']);
    }
    if (params['min']) {
      query.append('min', params['min']);
    }
    if (params['max']) {
      query.append('max', params['max']);
    }
    //console.log(query.toString());
    return this.http.get(`${this.productUrl}?${query.toString()}`).pipe(
      map((result: { count: number; products: Product[] }) => {
        return result.products;
      })
    );
  }

  getProductById(id: string) {
    return this.http.get(`${this.productUrl}/${id}`).pipe(
      map((result) => {
        return <Product>result;
      })
    );
  }

  saveProduct(data: FormData) {
    return this.http.post(this.productUrl, data).pipe(
      map((result: { message: string; product: Product }) => {
        return <Product>result.product;
      })
    );
  }

  updateProduct(data, id) {
    return this.http.patch(this.productUrl + '/' + id, data);
  }
}
