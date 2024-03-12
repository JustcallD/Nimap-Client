import { Injectable } from '@angular/core';
import { Category } from '../CategoryService/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = 'https://nimap-server.onrender.com/';

  async getCategory(): Promise<{ category: Category[] }> {
    const data = await fetch(`${this.apiUrl}categories`);
    const response = await data.json();
    console.log(response);
    return response;
  }
  async addCategory(newCategory: Category): Promise<void> {
    const response = await fetch(`${this.apiUrl}categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCategory),
    });
    if (!response.ok) {
      throw new Error('Failed to add category');
    }
  }

  async deleteCategory(id: string): Promise<void> {
    const response = await fetch(`${this.apiUrl}categories/${id}`, {
      method: 'DELETE',
    });
    console.log(response);
    if (!response.ok) {
      throw new Error('Failed to delete category');
    }
  }

  async updateCategory(updatedCategory: Category): Promise<void> {
    const response = await fetch(
      `${this.apiUrl}categories/${updatedCategory.id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCategory),
      }
    );
    if (!response.ok) {
      throw new Error('Failed to update category');
    }
  }
}
