import { UserTy } from "@/types/user.type";
import { Request, Response } from "express";
import { OrderModel } from "../model/order.model";

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await OrderModel.find();
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
  const user = req.user as UserTy;
  const { items, totalAmount } = req.body;

  const order = await new OrderModel({ userId: user._id, items, totalAmount: Number(totalAmount), status: "pending" })
    .save()
    .then((user) => user.toObject());

  return res.status(200).json({
    data: {
      orderId: order._id,
    },
  });
};
export const updateOrderStatus = async (req: Request, res: Response) => {};
