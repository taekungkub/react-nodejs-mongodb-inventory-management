import { OrderModel } from "@/model/order.model";
import { ProductModel } from "@/model/product.model";
import { UserModel } from "@/model/user.model";
import { Request, Response } from "express";

export const getDashboard = async (req: Request, res: Response) => {
  try {
    const orders = await OrderModel.find();
    const users = await UserModel.find();
    const products = await ProductModel.find();

    const orderDeliverly = await OrderModel.find({ status: "delivered" });

    const totalPrice = orderDeliverly.reduce((acc, v) => acc + v.totalAmount, 0);

    return res.status(200).json({
      data: [
        {
          title: "Order",
          value: orders.length,
        },
        {
          title: "User",
          value: users.length,
        },
        {
          title: "Product",
          value: products.length,
        },
        {
          title: "Total",
          value: "$" + totalPrice,
        },
      ],
    });
  } catch (error) {
    return res.status(500).json({
      description: error.message,
    });
  }
};

export const getDashboardStock = async (req: Request, res: Response) => {
  try {
    const readyStock = await ProductModel.find({ stock: { $gte: 1 }, status: { $eq: true } }); //>=
    const closeStock = await ProductModel.find({ stock: { $lte: 30 } }); // <=
    const overStock = await ProductModel.find({ stock: { $lte: 0 } }); // ==

    return res.status(200).json({
      data: [
        {
          title: "สินค้าพร้อมขาย",
          value: readyStock.length,
        },

        {
          title: "ใกล้หมด",
          value: closeStock.length,
        },
        {
          title: "หมด",
          value: overStock.length,
        },
      ],
    });
  } catch (error) {
    return res.status(500).json({
      description: error.message,
    });
  }
};
