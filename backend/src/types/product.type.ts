export interface ProductTy {
  _id?: string;
  title: string;
  description?: string;
  stock: number;
  price: number;
  status?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
