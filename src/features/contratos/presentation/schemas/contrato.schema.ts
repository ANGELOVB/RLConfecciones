import { z } from "zod";

const numeroString = (mensaje: string) =>
  z
    .string()
    .trim()
    .min(1, "Campo obligatorio")
    .transform(Number)
    .pipe(z.number({ error: mensaje }).positive("Debe ser mayor a 0"));

export const contratoSchema = z.object({
  idCorte: z.string().trim().min(1, "El corte es obligatorio"),
  idMaquilero: numeroString("Debe ser un número").pipe(z.number().int("Debe ser un entero")),
  comentarios: z.string().trim(),
  precioMaquilero: numeroString("Debe ser un número válido"),
  fechaCompromisoMaquilero: z
  .string()
  .trim()
  .min(1, "La fecha es obligatoria")
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Fecha no válida")
  .transform((v) => v.replace(/-/g, "/")),
});

export type ContratoFormValues = z.input<typeof contratoSchema>;  // todo string (estado del form)
export type ContratoPayload = z.output<typeof contratoSchema>;    // idMaquilero y precioMaquilero: number