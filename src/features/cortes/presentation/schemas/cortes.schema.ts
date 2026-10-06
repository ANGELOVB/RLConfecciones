import { z } from "zod";

export const cortesSchema = z.object({
  id: z.string().trim().min(1, "El identificador es obligatorio"),
  estilo: z.string().trim().min(1, "El estilo es obligatorio"),
  descripcion: z.string().trim().min(1, "La descripción es obligatoria"),
  composicionTela: z
    .string()
    .trim()
    .min(1, "La composición de tela es obligatoria"),
  idCliente: z.string().trim().min(1, "El cliente es obligatorio"),
  totalBolsas: z
    .number({ message: "Debe ser un número" })
    .int("Debe ser un número entero")
    .nonnegative("Debe ser un número ≥ 0"),
  totalPiezas: z
    .number({ message: "Debe ser un número" })
    .int("Debe ser un número entero")
    .nonnegative("Debe ser un número ≥ 0"),
});

export type CortesFormValues = z.infer<typeof cortesSchema>;