import { crearAuthUseCases } from "./application/auth.use-cases";
import { authApiRepository } from "./infrastructure/auth-api.repository";

export const authUseCases = crearAuthUseCases(authApiRepository);