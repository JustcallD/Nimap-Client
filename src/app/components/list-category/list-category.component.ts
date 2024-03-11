import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Category } from './CategoryService/category';
import { CategoryService } from './CategoryService/category.service';

@Component({
  selector: 'app-list-category',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css'],
})
export class ListCategoryComponent implements OnInit {
  categories: Category[] = [];
  newCategoryName: string = '';

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.loadCategories();
  }

  async loadCategories() {
    try {
      const data: any = await this.categoryService.getCategory();
      this.categories = data;
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  }
  async addCategory() {
    try {
      const newCategory: Category = { name: this.newCategoryName };

      await this.categoryService.addCategory(newCategory);
      this.loadCategories();
      this.newCategoryName = '';
    } catch (error) {
      console.error('Error adding category:', error);
    }
  }

  async deleteCategory(_id: string) {
    try {
      await this.categoryService.deleteCategory(_id);
      this.loadCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  }

  async updateCategory(updatedCategory: Category) {
    try {
      await this.categoryService.updateCategory(updatedCategory);
      this.loadCategories();
    } catch (error) {
      console.error('Error updating category:', error);
    }
  }
}
