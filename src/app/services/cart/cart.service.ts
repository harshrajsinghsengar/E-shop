import { Product } from './../../models/products';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart = {};
  private _cartObservable: BehaviorSubject<Object>;
  constructor() {
    if (!this.isCartExists())
      localStorage.setItem('cart', JSON.stringify(this.cart));
    this.readCartDataFromLocalStorage();
    this._cartObservable = new BehaviorSubject(this.cart);
  }
  get cartObservable() {
    return this._cartObservable;
  }

  addToCart(product: Product) {
    let quantity = this.cart[product._id];
    if (quantity) {
      this.cart[product._id] = +quantity + 1;
    } else {
      this.cart[product._id] = 1;
    }
    this._cartObservable.next(this.cart);
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  readCartDataFromLocalStorage() {
    this.cart = JSON.parse(localStorage.getItem('cart'));
  }

  isCartExists() {
    if (localStorage.getItem('cart')) {
      return true;
    } else {
      return false;
    }
  }

  removeFromCart(product: Product) {}
}
