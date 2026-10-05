import { z } from "zod";

export const clienteSchema = z.object({
  id: z.string().trim().min(1, "El identificador es obligatorio"),
  nombre: z.string().trim().min(1, "El nombre es obligatorio"),
  direccion: z.string().trim().min(1, "La dirección es obligatorio"),
});

export type ClienteFormValues = z.infer<typeof clienteSchema>;