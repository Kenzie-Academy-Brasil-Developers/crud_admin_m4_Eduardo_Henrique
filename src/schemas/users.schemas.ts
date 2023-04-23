import { z } from "zod";

export const userSchema = z.object({
  id: z.number(),
  name: z.string().max(20).nonempty(),
  email: z.string().email().max(100).nonempty(),
  password: z.string().min(4).max(120),
  admin: z.boolean().optional(),
  active: z.boolean().optional(),
});

export const requestUserSchema = userSchema.omit({ id: true, active: true });

export const requestLoginUserSchema = userSchema.omit({ id: true,name:true, admin: true, active: true });

export const responseUserSchema = userSchema.omit({ password: true });

export const updateUserSchema = requestUserSchema
  .omit({ admin: true, active: true, password: true })
  .partial();
