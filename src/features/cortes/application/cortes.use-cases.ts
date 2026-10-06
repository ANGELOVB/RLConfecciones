import type { Corte, CrearCorte, FiltrosCorte } from "../domain/Cortes";
import type { CortesRepository } from "../domain/CortesRepository";

export function crearCortesUseCases(repository: CortesRepository) {
  return {
    listar(): Promise<Corte[]> {
      return repository.getList();
    },

    listarConFiltros(filtros: FiltrosCorte): Promise<Corte[]> {
      return repository.getListWithFilter(filtros);
    },

    obtenerPorId(id: string): Promise<Corte> {
      return repository.getById(id);
    },

    crear(data: CrearCorte): Promise<Corte> {
      return repository.add(data);
    },

    eliminar(id: string): Promise<void> {
      return repository.deleteById(id);
    },
  };
}

