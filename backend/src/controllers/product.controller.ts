import { Request, Response } from "express";
import { ProductModel } from "../persistence/mongodb/product.model";
import { ProductSchema } from "../validation/product.schema";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await ProductModel.find();

    return res.status(200).json({
      data: products,
    });
  } catch (error) {}
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const validatedFields = await ProductSchema.safeParseAsync(req);

    if (!validatedFields.success) {
      throw new Error("Invalid field");
    }

    const { title, description, stock } = validatedFields.data.body;

    const newProduct = await new ProductModel({
      title,
      description,
      stock,
    })
      .save()
      .then((product) => product.toObject());

    return res.status(200).json({
      data: {
        id: newProduct._id,
      },
    });
  } catch (error) {
    return res.status(500).json({
      description: error.message,
    });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new Error("Id not found");
    }
    const existProduct = await ProductModel.findById({
      _id: id,
    });

    if (!existProduct) {
      throw new Error("Product not found");
    }

    return res.status(200).json({
      data: existProduct,
    });
  } catch (error) {
    return res.status(500).json({
      description: error.message,
    });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw new Error("Id not found");
    }

    const validatedFields = await ProductSchema.safeParseAsync(req);

    if (!validatedFields.success) {
      throw new Error("Invalid field");
    }

    const { title, description, stock } = validatedFields.data.body;

    const existProduct = await ProductModel.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        $set: {
          title,
          description,
          stock,
        },
      }
    );

    if (!existProduct) {
      throw new Error("Product not found");
    }

    return res.status(200).json({
      data: existProduct,
    });
  } catch (error) {
    return res.status(500).json({
      description: error.message,
    });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw new Error("Id not found");
    }

    const existProduct = await ProductModel.findByIdAndDelete({
      _id: id,
    });

    return res.status(200).json({
      data: existProduct,
    });
  } catch (error) {
    return res.status(500).json({
      description: error.message,
    });
  }
};
