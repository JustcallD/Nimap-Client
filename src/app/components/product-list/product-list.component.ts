
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../ProductService/product.service';
import { Product } from '../ProductService/Product';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  error: any;
  currentPage: number = 1;
  totalPages: number = 0;
  totalProducts: number = 0;
  limit: number = 5;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  async loadProducts() {
    try {
      const { products, total } = await this.productService.getProductByLimit(
        this.currentPage,
        this.limit
      );
      
      this.products = products;
      this.totalProducts = total;
      this.totalPages = Math.ceil(total / this.limit);
    } catch (error) {
      this.error = error;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadProducts();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadProducts();
    }
  }
}
