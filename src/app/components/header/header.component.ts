import { CartService } from './../../services/cart/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  numberOfItems: number = 0;
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cartObservable.subscribe({
      next: (cart) => {
        console.log(cart);
        this.numberOfItems = Object.keys(cart).length;
      },
    });
  }
}
