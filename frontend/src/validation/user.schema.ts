import { z } from "zod";

export const CreateUserSchema = z.object({
  username: z.string().min(1, {
    message: "Username is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  role: z.string().min(1, {
    message: "Role is required",
  }),
});
