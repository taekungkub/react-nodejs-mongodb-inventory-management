import { Request, Response } from "express";
import { UserModel } from "../model/user.model";
import { CreateUserSchema } from "../validation/user.schema";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find();
    return res.status(200).json({
      status: "success",
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      description: error.message,
    });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const validatedFields = await CreateUserSchema.safeParseAsync(req);

    if (!validatedFields.success) {
      throw new Error("Invalid field");
    }

    const body = validatedFields.data.body;

    const newUser = await new UserModel({
      ...body,
    })
      .save()
      .then((user) => user.toObject());

    return res.status(200).json({
      status: "success",
      description: "Successfully created the user",
      data: {
        ...newUser,
      },
    });
  } catch (error) {
    return res.status(500).json({
      description: error.message,
    });
  }
};

export const updateUserById = async (req: Request, res: Response) => {
  try {
    if (!req.params.id) {
      throw new Error("UserId not found");
    }

    const validatedFields = await CreateUserSchema.safeParseAsync(req);

    if (!validatedFields.success) {
      throw new Error("Invalid field");
    }

    const body = validatedFields.data.body;

    const result = await UserModel.findByIdAndUpdate(req.params.id, { $set: { ...body } });

    if (!result) {
      throw new Error("User not found");
    }
    res.status(200).json({
      status: "success",
      description: "User  update successful",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      description: error.message,
    });
  }
};

export const deleteUserById = async (req: Request, res: Response) => {
  try {
    if (!req.params.id) {
      throw new Error("CategoryId not found");
    }

    const result = await UserModel.findByIdAndDelete(req.params.id);
    if (!result) {
      throw new Error("User not found");
    }
    res.status(200).json({
      status: "success",
      description: "User  update successful",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      description: error.message,
    });
  }
};
