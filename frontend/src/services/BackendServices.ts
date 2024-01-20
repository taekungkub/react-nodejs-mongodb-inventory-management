import { z } from "zod";
import { UserTy } from "../types/user.type";
import ApiOne from "./Api";
import { CategorySchema, ProductSchema } from "../validation/product.schema";
import { RegisterSchema } from "../validation/auth.schema";
import { CategoryTy, ProductTy } from "../types/product.type";
import { CreateOrderSchema } from "../validation/order.schema";
import { OrderTy } from "../types/order.type";
import { DashboardStockTy, DashboardTy } from "../types/dashboard.type";
import { CreateUserSchema } from "../validation/user.schema";

export default {
  login(username: string, password: string) {
    return ApiOne.post<{
      data: {
        access_token: string;
      };
    }>("/auth/login", {
      username,
      password,
    });
  },
  register(data: z.infer<typeof RegisterSchema>) {
    return ApiOne.post("/auth/register", {
      ...data,
    });
  },
  profile() {
    return ApiOne.get<{
      data: UserTy;
    }>("/auth/profile");
  },
  products() {
    return ApiOne.get<{
      data: ProductTy[];
    }>("/products");
  },
  product(id: string) {
    return ApiOne.get(`/products/${id}`);
  },
  createProduct(data: z.infer<typeof ProductSchema>) {
    return ApiOne.post(`/products`, {
      ...data,
    });
  },
  editProduct(id: string, data: z.infer<typeof ProductSchema>) {
    return ApiOne.put(`/products/${id}`, {
      ...data,
    });
  },
  deleteProduct(id: string) {
    return ApiOne.delete(`/products/${id}`);
  },
  orders() {
    return ApiOne.get<{
      data: OrderTy[];
    }>("/orders");
  },
  createOrders(data: z.infer<typeof CreateOrderSchema>) {
    return ApiOne.post<{
      data: {
        orderId: string;
      };
    }>("/orders", {
      ...data,
    });
  },
  updaetOrderStatus(id: string, status: string) {
    return ApiOne.put(`/orders/${id}/status`, {
      status,
    });
  },
  dashboard() {
    return ApiOne.get<{
      data: DashboardTy[];
    }>("/dashboard");
  },
  dashboardStock() {
    return ApiOne.get<{
      data: DashboardStockTy[];
    }>("/dashboard/stock");
  },
  category() {
    return ApiOne.get<{
      data: CategoryTy[];
    }>("/category");
  },
  createCategory(data: z.infer<typeof CategorySchema>) {
    return ApiOne.post<{
      data: "";
    }>("/category", {
      ...data,
    });
  },
  updateCategory(id: string, data: z.infer<typeof CategorySchema>) {
    return ApiOne.put(`/category/${id}`, {
      ...data,
    });
  },
  deleteCategory(id: string) {
    return ApiOne.delete(`/category/${id}`);
  },
  users() {
    return ApiOne.get(`/users`);
  },
  user(id: string) {
    return ApiOne.get(`/users/${id}`);
  },
  createUser(id: string, data: z.infer<typeof CreateUserSchema>) {
    return ApiOne.post(`/users/${id}`, {
      data,
    });
  },
  updateUser(id: string, data: z.infer<typeof CreateUserSchema>) {
    return ApiOne.put(`/users/${id}`, {
      data,
    });
  },
  deleteUser(id: string) {
    return ApiOne.delete(`/users/${id}`);
  },
};
