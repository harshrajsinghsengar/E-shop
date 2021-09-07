import { map } from 'rxjs/operators';
import { ProductService } from './../../services/product/product.service';
import { Product } from './../../models/products';
import { CartService } from './../../services/cart/cart.service';
import { Component, OnInit } from '@angular/core';
import { forkJoin, Subscription } from 'rxjs';

interface CartItem {
  product: Product;
  quantity: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart;
  total = 0;
  cartItems: CartItem[] = [];
  cartSubscription: Subscription;
  constructor(
    private cartService: CartService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.subscribeCart();
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }

  subscribeCart() {
    let total = 0;
    this.cartSubscription = this.cartService.cartObservable.subscribe({
      next: (cart) => {
        let observables = [];
        total = 0;
        if (Object.keys(cart).length == 0) {
          this.cartItems = [];
        }
        for (let id in cart) {
          //console.log(id);
          observables.push(
            this.productService.getProductById(id).pipe(
              map((product) => {
                total += product.price * cart[id];
                let item: CartItem = {
                  product: product,
                  quantity: cart[id],
                };
                return item;
              })
            )
          );
        }
        forkJoin(observables).subscribe({
          next: (cartItems: CartItem[]) => {
            this.total = total;
            this.cartItems = cartItems;
          },
        });
      },
    });
  }
}
