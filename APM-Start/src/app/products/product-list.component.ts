import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EMPTY, Observable, combineLatest, BehaviorSubject } from 'rxjs';

import { Product } from './product';
import { ProductService } from './product.service';
import { catchError, map } from 'rxjs/operators';
import { ProductCategoryService } from '../product-categories/product-category.service';
import { ProductCategory } from '../product-categories/product-category';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent {
  pageTitle = 'Product List';
  errorMessage = '';

  private categorySelectedSubject = new BehaviorSubject<number>(0);
  categorySelectedAction$: Observable<number> = this.categorySelectedSubject.asObservable();

  products$: Observable<Product[]> = combineLatest([
    this.productService.productWithCategories$,
    this.categorySelectedAction$
  ]).pipe(
    map(([products, selectedCategotyId]) =>
      products.filter(product =>
        selectedCategotyId ? product.categoryId === selectedCategotyId : true
      )),
    catchError(err => {
      this.errorMessage = err
      return EMPTY;
    })
  );

  categories$: Observable<ProductCategory[]> = this.productCategoryService.productCategories$
    .pipe(
      catchError(err => {
        this.errorMessage = err
        return EMPTY;
      })
    );

  constructor(private productService: ProductService,
    private productCategoryService: ProductCategoryService) { }

  onAdd(): void {
    console.log('Not yet implemented');
  }

  onSelected(categoryId: string): void {
    this.categorySelectedSubject.next(+categoryId);
  }
}
