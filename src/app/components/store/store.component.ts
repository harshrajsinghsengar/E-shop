import { ProductService } from './../../services/product/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/products';
import { observable } from 'rxjs';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
})
export class StoreComponent implements OnInit {
  products: Product[] = [];
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.collectProducts();
  }

  collectProducts() {
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.products = products;
        //console.log(this.products);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
