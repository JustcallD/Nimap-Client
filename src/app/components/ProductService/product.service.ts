import { Injectable } from '@angular/core';
import { Product } from './Product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'https://nimap-server.onrender.com/';

  async getProductByLimit(
    page: number = 1,
    pageSize: number = 5
  ): Promise<{ products: Product[]; total: number }> {
    const data = await fetch(
      `${this.apiUrl}products?page=${page}&pageSize=${pageSize}`
    );
    const response = await data.json();
    console.log(response);

    return response;
  }

  async addProduct(
    name: string,
    categoryId: string
  ): Promise<{ products: Product[] }> {
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, categoryId }),
    };

    const data = await fetch(`${this.apiUrl}products`, requestOptions);
    const response = await data.json();

    return response;
  }
  async getCategories(): Promise<{ category: any }> {
    const data = await fetch(`${this.apiUrl}categories`);
    const response = await data.json();

    return response;
  }
  async updateProduct(product: Product): Promise<void> {
    const requestOptions: RequestInit = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: product.name,
        categoryId: product.categoryId._id,
      }),
    };

    await fetch(`${this.apiUrl}products/${product._id}`, requestOptions);
  }
  async deleteProduct(_id: string): Promise<void> {
    const response = await fetch(`${this.apiUrl}products/${_id}`, {
      method: 'DELETE',
    });
    console.log(response);
    if (!response.ok) {
      throw new Error('Failed to delete category');
    }
  }
}
