import type { CrearMaquilero, Maquilero } from "./Maquilero";

export interface MaquileroRepository {
  getList(): Promise<Maquilero[]>;

  add(data: CrearMaquilero): Promise<Maquilero>;

  updateById(data: Maquilero): Promise<Maquilero>;

  deleteById(id: number): Promise<void>;
}