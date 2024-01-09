import { z } from "zod";
import { ERRORS } from "../helper/errors-message";

export const LoginSchema = z.object({
  body: z.object({
    username: z.string().min(1, {
      message: "Username is required",
    }),
    password: z.string().min(1, {
      message: "Password is required",
    }),
  }),
});

export type LoginSchemaBody = z.infer<typeof LoginSchema>["body"];

export const RegisterSchema = z.object({
  body: z
    .object({
      username: z.string().min(1, {
        message: "Username is required",
      }),
      email: z.string().email({ message: "Email is required" }),
      password: z.string().min(6, {
        message: "Password is required",
      }),
      confirm_password: z.string().min(6, {
        message: "Confirm password is required",
      }),
    })
    .refine((data) => data.password === data.confirm_password, {
      message: ERRORS.PASSWORD_NOT_MATCH,
      path: ["confirm_password"],
    }),
});

export type RegisterSchemaBody = z.infer<typeof RegisterSchema>["body"];
