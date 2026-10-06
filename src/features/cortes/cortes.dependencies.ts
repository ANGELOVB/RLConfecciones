import { crearCortesUseCases } from "./application/cortes.use-cases";
import { cortesApiRepository } from "./infrastructure/cortes-api.repository";

export const cortesUseCases = crearCortesUseCases(cortesApiRepository);
