import { Component, HostListener, OnInit } from '@angular/core';
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
  showModal: boolean = false;
  selectedCategory: Category | null = null;
  updatedCategoryName: string = '';
  isResponsive: boolean = false;
  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.loadCategories();
    this.onResize();
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

  async deleteCategory(id: string) {
    try {
      console.log('_id', id);
      if (!id) {
        throw new Error('Category ID is undefined');
      }
      await this.categoryService.deleteCategory(id);
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

  // Method to open modal and set selected category for editing
  openEditModal(category: Category) {
    this.selectedCategory = category;
    this.updatedCategoryName = category.name;
    this.showModal = true;
  }

  // Method to close modal
  closeEditModal() {
    this.selectedCategory = null;
    this.showModal = false;
  }

  // Method to update category name
  async updateCategoryName() {
    if (this.selectedCategory) {
      this.selectedCategory.name = this.updatedCategoryName;
      await this.updateCategory(this.selectedCategory);
      this.closeEditModal();
    }
  }
  @HostListener('window:resize', ['$event'])
  onResize(event?: any) {
    // Update isResponsive based on the window width
    this.isResponsive = window.innerWidth < 605; // Adjust the breakpoint as needed
  }
}
