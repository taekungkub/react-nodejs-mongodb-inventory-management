import { z } from "zod"

export const LoginSchema = z.object({
  username: z.string().min(1, {
    message: "Username is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
})

export const RegisterSchema = z
  .object({
    username: z.string().min(1, {
      message: "Username is required",
    }),
    email: z.string().email({
      message: "Email is required",
    }),
    password: z.string().min(6, {
      message: "Minimum 6 characters required",
    }),
    confirm_password: z.string().min(6, {
      message: "Minimum 6 characters required",
    }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Password not match",
    path: ["confirm_password"],
  })
