import type { Hono, MiddlewareHandler } from "hono";
import z from "zod";

export const userSchema = z.object({
  id: z.number(),
  title: z.string().min(2),
  email: z.email(),
});

export const userCreateSchema = userSchema.omit({ id: true }).extend({
    password: z.string(),
});

export const userUpdateSchema = userCreateSchema.partial();

export type UserType = z.infer<typeof userSchema>;
export type UserCreateType = z.infer<typeof userCreateSchema>;
export type UserUpdateType = z.infer<typeof userUpdateSchema>;

export type UserModuleSetupType = {
  authRouter: Hono;
  usersRouter: Hono;
  
  authMiddleware: MiddlewareHandler;
};
