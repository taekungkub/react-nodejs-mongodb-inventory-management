import { Request, Response } from "express";
import { CategoryModel } from "../model/category.model";
import { CategorySchema } from "@/validation/product.schema";

export const getCategory = async (req: Request, res: Response) => {
  try {
    const categories = await CategoryModel.find();
    return res.status(200).json({
      status: "success",
      data: categories,
    });
  } catch (error) {
    return res.status(500).json({
      description: error.message,
    });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const validatedFields = await CategorySchema.safeParseAsync(req);

    if (!validatedFields.success) {
      throw new Error("Invalid field");
    }

    const body = validatedFields.data.body;

    const newCategory = await new CategoryModel({
      ...body,
    })
      .save()
      .then((category) => category.toObject());

    return res.status(200).json({
      status: "success",
      description: "Successfully created the category",
      data: {
        id: newCategory._id,
      },
    });
  } catch (error) {
    return res.status(500).json({
      description: error.message,
    });
  }
};

export const updateCategoryById = async (req: Request, res: Response) => {
  try {
    if (!req.params.id) {
      throw new Error("CategoryId not found");
    }

    const validatedFields = await CategorySchema.safeParseAsync(req);

    if (!validatedFields.success) {
      throw new Error("Invalid field");
    }

    const body = validatedFields.data.body;

    const result = await CategoryModel.findByIdAndUpdate(req.params.id, { $set: { ...body } });
    if (!result) {
      throw new Error("Category not found");
    }
    res.status(200).json({
      status: "success",
      description: "Category  update successful",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      description: error.message,
    });
  }
};

export const deleteCategoryById = async (req: Request, res: Response) => {
  try {
    if (!req.params.id) {
      throw new Error("CategoryId not found");
    }

    const result = await CategoryModel.findByIdAndDelete(req.params.id);
    if (!result) {
      throw new Error("Category not found");
    }
    res.status(200).json({
      status: "success",
      description: "Category  update successful",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      description: error.message,
    });
  }
};
