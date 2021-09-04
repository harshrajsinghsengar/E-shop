import { HttpErrorResponse } from '@angular/common/http';
import { CategoryService } from './../../services/category/category.service';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit {
  categories: Category[] = [];
  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.collectAllCategory();
  }

  categorySelected(category_id: string) {
    console.log(category_id);
  }

  collectAllCategory() {
    this.categoryService.getAllCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        // console.log(categories);
      },
      error: (response: HttpErrorResponse) => {
        console.log(response);
      },
    });
  }
}
