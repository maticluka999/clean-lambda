import z from "zod";

export const noteSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  text: z.string(),
});

export type Note = z.infer<typeof noteSchema>;
