export interface ProductTy {
  _id: string;
  title: string;
  description: string;
  stock: number;
  price: number;
  status: boolean;
  category?: CategoryTy;
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItemTy extends ProductTy {
  qty: number;
}

export interface CategoryTy {
  _id?: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
