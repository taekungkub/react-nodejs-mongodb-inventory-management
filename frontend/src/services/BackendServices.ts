import { UserTy } from "../types/user.type"
import ApiOne from "./Api"

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
  register(username: string, email: string, password: string, confirm_password: string) {
    return ApiOne.post("/auth/register", {
      username,
      email,
      password,
      confirm_password,
    })
  },
  profile() {
    return ApiOne.get<{
      data: UserTy
    }>("/auth/profile")
  },
  products() {
    return ApiOne.get("/products")
  },
  product(id: string) {
    return ApiOne.get(`/products/${id}`)
  },
  createProduct(title: string, description: string, stock: number) {
    return ApiOne.post(`/products`, {
      title,
      description,
      stock,
    })
  },
  editProduct(id: string | undefined, title: string, description: string, stock: number) {
    return ApiOne.put(`/products/${id}`, {
      title,
      description,
      stock,
    })
  },
  deleteProduct(id: string) {
    return ApiOne.delete(`/products/${id}`)
  },
}
