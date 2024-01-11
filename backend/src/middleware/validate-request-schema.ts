import { RequestHandler } from "express";
import { Schema, ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

const validateRequestSchema =
  (schema: Schema): RequestHandler =>
  async (req, res, next) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(200).json({
          statusCode: 400,
          description: validationError.details[0].message,
        });
      } else {
        next(error);
      }
    }
  };

export default validateRequestSchema;
