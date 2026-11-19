import z from "zod";

export const postSchema = z.object({
  id: z.number(),
  content: z.string().min(2)
});

export const postCreateSchema = postSchema.omit({id: true});

export type PostType = z.infer<typeof postSchema>;
export type PostCreateType = z.infer<typeof postCreateSchema>;