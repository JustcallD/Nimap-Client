import { Component, OnInit } from '@angular/core';
import { ProductService } from '../ProductService/product.service';
import { Product } from '../ProductService/Product';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  error: any;
  currentPage: number = 1;
  totalPages: number = 0;
  totalProducts: number = 0;
  limit: number = 10;
  categories: any[] = [];
  showModal: boolean = false;
  selectedProduct: Product | null = null;
  updatedProductName: string = '';
  updatedCategoryId: string = '';
  // loading: boolean = false;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    // this.loading = true;
    this.loadProducts();
    this.fetchCategories();
    // this.loading = false;
  }

  async fetchCategories() {
    try {
      const response: any = await this.productService.getCategories();

      this.categories = response;
      console.log('this.categories', this.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      // this.loading = false; // Set loading to false when data fetching is completed
    }
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
  async deleteProduct(id: string) {
    try {
      console.log('_id', id);
      if (!id) {
        throw new Error('Category ID is undefined');
      }
      await this.productService.deleteProduct(id);
      this.loadProducts();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  }
  openEditModal(product: Product) {
    this.selectedProduct = product;
    this.updatedProductName = product.name;
    this.updatedCategoryId = product.category_id;
    this.showModal = true;
  }

  closeEditModal() {
    this.selectedProduct = null;
    this.showModal = false;
  }
  async updateProduct() {
    if (this.selectedProduct) {
      this.selectedProduct.name = this.updatedProductName;
      this.selectedProduct.category_id = this.updatedCategoryId;

      // Update product using productService
      await this.productService.updateProduct(this.selectedProduct);

      // Reload products
      this.loadProducts();

      // Close modal
      this.closeEditModal();
    }
  }
}
