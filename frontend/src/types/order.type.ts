import { ProductTy } from "./product.type"
import { UserTy } from "./user.type"

interface ProductInCart {
  productId: ProductTy
  qty: number
}

export interface OrderTy {
  _id?: string
  userId: UserTy
  items: ProductInCart[]
  totalAmount: number
  status: string
  createdAt: Date
  updatedAt: Date
}
