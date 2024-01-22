import { UserTy } from "@/types/user.type";
import { Request, Response } from "express";
import { OrderModel } from "../model/order.model";
import { CartItemTy } from "@/types/order.type";
import { ProductModel } from "@/model/product.model";

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await OrderModel.find().populate("userId", "username email"); // only return the Persons name

    return res.status(200).json({
      data: orders,
    });
  } catch (error) {
    return res.status(500).json({
      description: error.message,
    });
  }
};
export const getOrder = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) {
      throw new Error("Id not found");
    }

    const order = await OrderModel.findById({ _id: id }).populate("userId").populate("items.productId");

    return res.status(200).json({
      data: order,
    });
  } catch (error) {
    return res.status(500).json({
      description: error.message,
    });
  }
};
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

    const carts = cartItems.map((item) => {
      return {
        productId: item.productId,
        qty: item.qty,
      };
    });

    // await CartItemModel.insertMany(carts);

    const order = await new OrderModel({ userId: user._id, items, totalAmount: Number(totalAmount), status: "pending" })
      .save()
      .then((v) => v.toObject());

    await OrderModel.findByIdAndUpdate(order._id, { $set: { items: carts } });

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
