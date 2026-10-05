import { crearMaquileroUseCases } from "./application/maquilero.use-cases";
import { maquileroApiRepository } from "./infrastructure/maquilero-api.repository";

export const maquileroUseCases = crearMaquileroUseCases(
  maquileroApiRepository,
);