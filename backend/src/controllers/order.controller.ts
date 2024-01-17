import { UserTy } from "@/types/user.type";
import { Request, Response } from "express";
import { OrderModel } from "../model/order.model";
import { CartItemTy } from "@/types/order.type";
import { ProductModel } from "@/model/product.model";

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await OrderModel.find().populate("userId", "username email"); // only return the Persons name

    console.log(orders);
    return res.status(200).json({
      data: orders,
    });
  } catch (error) {
    return res.status(500).json({
      description: error.message,
    });
  }
};
export const getOrder = async (req: Request, res: Response) => {};
export const createOrders = async (req: Request, res: Response) => {
  try {
    const user = req.user as UserTy;
    const { items, totalAmount } = req.body;

    const cartItems = items as CartItemTy[];

    cartItems.forEach(async (v) => {
      await ProductModel.findByIdAndUpdate(
        { _id: v.productId },
        {
          $inc: {
            stock: -v.qty,
          },
        }
      );
    });

    const order = await new OrderModel({ userId: user._id, items, totalAmount: Number(totalAmount), status: "pending" })
      .save()
      .then((user) => user.toObject());

    return res.status(200).json({
      data: {
        orderId: order._id,
      },
    });
  } catch (error) {
    return res.status(500).json({
      description: error.message,
    });
  }
};
export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const user = req.user as UserTy;
    const { id } = req.params;
    const { status } = req.body;

    const order = await OrderModel.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          status: status,
        },
      }
    );
    return res.status(200).json({
      data: {
        orderId: order._id,
      },
    });
  } catch (error) {
    return res.status(500).json({
      description: error.message,
    });
  }
};
