import type { Cliente } from "./Cliente";

export interface ClienteRepository {
  getList(): Promise<Cliente[]>;

  add(data: Cliente): Promise<Cliente>;

  updateById(data: Cliente): Promise<Cliente>;

  deleteById(id: string): Promise<void>;
}