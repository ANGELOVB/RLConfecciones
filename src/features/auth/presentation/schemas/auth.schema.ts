import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().min(1, "Escribe tu usuario o correo"),
  password: z.string().min(1, "Escribe tu contraseña"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;