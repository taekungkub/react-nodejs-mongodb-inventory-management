import { Request, Response } from "express";
import { comparePassword, hashPassword, jwtTokenGenerate, successResponse } from "@/helper/utils";
import { UserModel } from "../persistence/mongodb/user.model";
import { LoginSchema, RegisterSchema } from "../validation/auth.schema";
import { UserTy } from "../types/user.type";

export const login = async (req: Request, res: Response) => {
  try {
    const validatedFields = await LoginSchema.safeParseAsync(req);

    if (!validatedFields.success) {
      throw new Error("Invalid field");
    }

    const { username, password } = validatedFields.data.body;

    const existingUser = await UserModel.findOne({
      username: username,
    }).select("+password");

    if (!existingUser) {
      throw new Error("Username or password is incorrect");
    }

    const isComparePassword = await comparePassword(password, existingUser.password);

    if (!isComparePassword) {
      throw new Error("Username or password is incorrect");
    }

    const access_token = await jwtTokenGenerate(existingUser);

    return res.status(200).json({
      data: {
        access_token: access_token,
      },
    });
  } catch (error) {
    return res.status(500).json({
      description: error.message,
    });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const validatedFields = await RegisterSchema.safeParseAsync(req);

    if (!validatedFields.success) {
      throw new Error("Invalid field");
    }

    const { username, email, password } = validatedFields.data.body;

    const emailExist = await UserModel.findOne({
      email,
    });

    const usernameExist = await UserModel.findOne({
      username,
    });

    if (emailExist || usernameExist) {
      throw new Error("Email or Username already exist");
    }

    const passwordHash = await hashPassword(password);

    const newUser = await new UserModel({
      username: username,
      email: email,
      password: passwordHash,
    })
      .save()
      .then((user) => user.toObject());

    return res.status(200).json({
      data: {
        email: newUser.email,
        username: newUser.username,
      },
    });
  } catch (error) {
    return res.status(500).json({
      description: error.message,
    });
  }
};

export const profile = async (req: Request, res: Response) => {
  try {
    const user = req.user as UserTy;

    const result = await UserModel.findOne({
      username: user.username,
    });

    if (!result) {
      throw new Error("User not found");
    }

    return res.status(200).json({
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      description: error.message,
    });
  }
};
