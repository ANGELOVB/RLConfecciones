import type {
  CrearMaquilero,
  Maquilero,
} from "../domain/Maquilero";

import type {
  MaquileroRepository,
} from "../domain/MaquileroRepository";

export function crearMaquileroUseCases(
  repository: MaquileroRepository,
) {
  return {
    listar(): Promise<Maquilero[]> {
      return repository.getList();
    },

    crear(data: CrearMaquilero): Promise<Maquilero> {
      return repository.add(data);
    },

    actualizar(data: Maquilero): Promise<Maquilero> {
      return repository.updateById(data);
    },

    eliminar(id: number): Promise<void> {
      return repository.deleteById(id);
    },
  };
}