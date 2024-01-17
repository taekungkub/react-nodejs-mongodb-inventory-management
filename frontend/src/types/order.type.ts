import { UserTy } from "./user.type"

export interface OrderTy {
  _id?: string
  userId: UserTy
  items: any
  totalAmount: number
  status: string
  createdAt: Date
  updatedAt: Date
}
