import { z } from "zod"
import { UserTy } from "../types/user.type"
import ApiOne from "./Api"
import { ProductSchema } from "../schemas/product.schema"
import { RegisterSchema } from "../schemas/auth.schema"
import { ProductTy } from "../types/product.type"
import { CreateOrderSchema } from "../schemas/order.schema"
import { OrderTy } from "../types/order.type"

export default {
  login(username: string, password: string) {
    return ApiOne.post<{
      data: {
        access_token: string
      }
    }>("/auth/login", {
      username,
      password,
    })
  },
  register(data: z.infer<typeof RegisterSchema>) {
    return ApiOne.post("/auth/register", {
      ...data,
    })
  },
  profile() {
    return ApiOne.get<{
      data: UserTy
    }>("/auth/profile")
  },
  products() {
    return ApiOne.get<{
      data: ProductTy[]
    }>("/products")
  },
  product(id: string) {
    return ApiOne.get(`/products/${id}`)
  },
  createProduct(data: z.infer<typeof ProductSchema>) {
    return ApiOne.post(`/products`, {
      ...data,
    })
  },
  editProduct(id: string, data: z.infer<typeof ProductSchema>) {
    return ApiOne.put(`/products/${id}`, {
      ...data,
    })
  },
  deleteProduct(id: string) {
    return ApiOne.delete(`/products/${id}`)
  },
  orders() {
    return ApiOne.get<{
      data: OrderTy[]
    }>("/orders")
  },
  createOrders(data: z.infer<typeof CreateOrderSchema>) {
    return ApiOne.post<{
      data: {
        orderId: string
      }
    }>("/orders", {
      ...data,
    })
  },
  updaetOrderStatus(id: string, status: string) {
    return ApiOne.put(`/orders/${id}/status`, {
      status,
    })
  },
}
