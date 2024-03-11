export interface Product {
  _id: string;
  name: string;
  categoryId: {
    _id: string;
    name: string;
  };
}
