import { Component, ChangeDetectionStrategy  } from '@angular/core';

import { EMPTY, Observable } from 'rxjs';

import { Product } from './product';
import { ProductService } from './product.service';
import { catchError, map } from 'rxjs/operators';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent {
  pageTitle = 'Product List';
  errorMessage = '';
  categories;

  products$: Observable<Product[]> = this.productService.products$
    .pipe(
      map(products =>
        products.map(product => ({
          ...product,
          price: product.price * 1.5,
          searchKey: [product.productName]
        }) as Product)
      ),
      catchError(err => {
        this.errorMessage = err
        return EMPTY;
      })
    );

  constructor(private productService: ProductService) { }

  onAdd(): void {
    console.log('Not yet implemented');
  }

  onSelected(categoryId: string): void {
    console.log('Not yet implemented');
  }
}
