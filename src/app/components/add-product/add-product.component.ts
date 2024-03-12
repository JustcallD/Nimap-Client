import { CommonModule } from '@angular/common';
import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../ProductService/product.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AddProductComponent implements OnInit {
  productName: string = '';
  productCategory: string = '';


  categories: { id: string; name: string }[] = [];

  constructor(private productService: ProductService) {
   
  }

  ngOnInit() {
    this.fetchCategories();
  }

  async fetchCategories() {
    try {
      const response: any = await this.productService.getCategories();
    
      this.categories = response;
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }

  async SubmitProduct() {
    try {
      
      const newProduct = {
        name: this.productName,
        categoryId: this.productCategory, 
      };
      
      await this.productService.addProduct(
        newProduct.name,
        newProduct.categoryId
      );
      console.log('Product added successfully');
      this.resetForm();
    } catch (error) {
      console.error('Error adding product:', error);
    }
  }

  resetForm() {
    this.productName = '';
    this.productCategory = '';
  }
}
