
import { crearClienteUseCases } from "./application/clientes.use-cases";
import { clienteApiRepository } from "./infrastructure/cliente-api.repository";

export const clienteUseCases = crearClienteUseCases(
  clienteApiRepository,
);