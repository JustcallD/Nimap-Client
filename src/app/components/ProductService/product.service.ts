import { Injectable } from '@angular/core';
import { Product } from './Product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:4001/';

  async getProductByLimit(
    page: number = 1,
    pageSize: number = 5
  ): Promise<{ products: Product[]; total: number }> {
    const data = await fetch(
      `${this.apiUrl}products?page=${page}&pageSize=${pageSize}`
    );
    const response = await data.json();

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
}
