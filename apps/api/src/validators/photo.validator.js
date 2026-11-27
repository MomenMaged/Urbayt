import { z } from "zod";

export const reorderSchema = z.object({
  ids: z
    .array(z.number().int().positive())
    .min(1)
    .max(500)
    .refine((ids) => new Set(ids).size === ids.length, "Duplicate photo ids."),
});

export const photoPatchSchema = z.object({
  alt: z.string().trim().max(200),
});
