import type {
  CrearContrato,
  Contrato,
  ActualizarContrato,
  DetalleContrato,
} from "../domain/Contrato";

import type {
  ContratoRepository,
} from "../domain/ContratoRepository";

export function crearContratoUseCases(
  repository: ContratoRepository,
) {
  return {
    listar(): Promise<DetalleContrato[]> {
      return repository.getList();
    },

    crear(data: CrearContrato): Promise<Contrato> {
      return repository.add(data);
    },

    actualizar(data: ActualizarContrato): Promise<Contrato> {
      return repository.updateById(data);
    },

    eliminar(id: number): Promise<void> {
      return repository.deleteById(id);
    },

    generarPDF(id: number): Promise<Blob> {
      return repository.generatePDFById(id);
    },
  };
}