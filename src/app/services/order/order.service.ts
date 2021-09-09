import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  orderUrl = 'http://localhost/api/orders';

  constructor(private http: HttpClient, private userService: UserService) {}
  placeOrder(orderInfo: OrderInfo) {
    let headers = new HttpHeaders({
      authorization: this.userService.getToken(),
    });
    return this.http.post(this.orderUrl, orderInfo, { headers });
  }
}
export interface OrderInfo {
  firstName: string;
  lastName: string;
  address: string;
  products: ProductInfo[];
}

export interface ProductInfo {
  productId: string;
  quantity: number;
  price: number;
}
