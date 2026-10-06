import { crearContratoUseCases } from "./application/contrato.use-cases";
import { contratoApiRepository } from "./infrastructure/contrato-api.repository";

export const contratoUseCases = crearContratoUseCases(
  contratoApiRepository,
);