import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { Order } from 'src/app/models/order';

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

  changeStatus(data: { status: string }, orderId: string) {
    let headers = new HttpHeaders({
      authorization: this.userService.getToken(),
    });
    return this.http.patch(this.orderUrl + '/' + orderId, data, { headers });
  }

  getUserOrders(all?: boolean) {
    let url = this.orderUrl;
    if (all) {
      url = url + '?all=true';
    }
    let headers = new HttpHeaders({
      authorization: this.userService.getToken(),
    });
    return this.http.get(url, { headers }).pipe(
      map((result: { count: number; orders: Order[] }) => {
        return result.orders;
      })
    );
  }
  getAdminOrders() {
    return this.getUserOrders(true);
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
