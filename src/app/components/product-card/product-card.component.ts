import { CartService } from './../../services/cart/cart.service';
import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/products';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  @Input('product')
  product: Product;
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    console.log(this.product);
  }

  addToCart() {
    console.log(this.product);
    this.cartService.addToCart(this.product);
  }
}
