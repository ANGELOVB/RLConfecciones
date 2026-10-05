import { z } from "zod";

export const maquileroSchema = z.object({
  nombre: z.string().trim().min(1, "El nombre es obligatorio"),
  apellidoMaterno: z.string().trim(),
  apellidoPaterno: z.string().trim(),
  direccion: z.string().trim(),
  telefono1: z.string().trim().min(1, "El teléfono es obligatorio"),
  telefono2: z.string().trim(),
});

export type MaquileroFormValues = z.infer<typeof maquileroSchema>;