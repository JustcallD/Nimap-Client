import { Routes } from '@angular/router';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ListCategoryComponent } from './components/list-category/list-category.component';
import { ProductListComponent } from './components/product-list/product-list.component';

export const routes: Routes = [
  { path: 'product-list', component: ProductListComponent },
  {
    path: 'add-product',
    component: AddProductComponent,
  },
  { path: 'list-category', component: ListCategoryComponent },
  { path: '', redirectTo: '/product-list', pathMatch: 'full' },
];
