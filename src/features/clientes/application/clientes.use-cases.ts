import type { Cliente,} from "../domain/Cliente";
import type { ClienteRepository} from "../domain/ClienteRepository";

export function crearClienteUseCases(
  repository: ClienteRepository,
) {
  return {
    listar(): Promise<Cliente[]> {
      return repository.getList();
    },

    crear(data: Cliente): Promise<Cliente> {
      return repository.add(data);
    },

    actualizar(data: Cliente): Promise<Cliente> {
      return repository.updateById(data);
    },

    eliminar(id: string): Promise<void> {
      return repository.deleteById(id);
    },
  };
}