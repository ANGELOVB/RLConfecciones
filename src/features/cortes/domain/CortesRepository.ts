import type { Corte, CrearCorte, FiltrosCorte } from "./Cortes";

export interface CortesRepository {
  getList(): Promise<Corte[]>;

  getListWithFilter(filtros: FiltrosCorte): Promise<Corte[]>;

  getById(id: string): Promise<Corte>;

  add(data: CrearCorte): Promise<Corte>;

  deleteById(id: string): Promise<void>;
}