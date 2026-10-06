import type { CrearContrato, Contrato, ActualizarContrato, DetalleContrato } from "./Contrato";

export interface ContratoRepository {
  getList(): Promise<DetalleContrato[]>;

  add(data: CrearContrato): Promise<Contrato>;

  updateById(data: ActualizarContrato): Promise<Contrato>;

  deleteById(id: number): Promise<void>;

  generatePDFById(id: number): Promise<Blob>;
}