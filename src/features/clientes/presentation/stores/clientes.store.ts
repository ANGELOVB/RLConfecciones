import { create } from "zustand";
import type {
  Cliente,
} from "../../domain/Cliente";
import { clienteUseCases } from "../../cliente.dependencies";

interface ClienteState {
  clientes: Cliente[];
  loading: boolean;
  saving: boolean;
  error: string | null;

  cargarClientes: () => Promise<void>;
  agregarCliente: (datos: Cliente) => Promise<void>;
  actualizarCliente: (datos: Cliente) => Promise<void>;
  eliminarCliente: (id: string) => Promise<void>;
}

export const useClienteStore = create<ClienteState>(
  (set, get) => ({
    clientes: [],
    loading: false,
    saving: false,
    error: null,

    cargarClientes: async () => {
      // Esta primera implementación ejecuta una operación a la vez.
      if (get().loading || get().saving) return;

      set({ loading: true, error: null });

      try {
        const clientes = await clienteUseCases.listar();

        set({ clientes });
      } catch {
        set({
          error: "No se pudieron cargar los clientes.",
        });
      } finally {
        set({ loading: false });
      }
    },

    agregarCliente: async (datos) => {
      if (get().loading || get().saving) {
        throw new Error("Hay una operación en curso.");
      }

      set({ saving: true });

      try {
        const nuevo = await clienteUseCases.crear(datos);

        set((state) => ({
          clientes: [...state.clientes, nuevo],
        }));
      } finally {
        set({ saving: false });
      }
    },

    actualizarCliente: async (datos) => {
      if (get().loading || get().saving) {
        throw new Error("Hay una operación en curso.");
      }

      set({ saving: true });

      try {
        const actualizado =
          await clienteUseCases.actualizar(datos);

        set((state) => ({
          clientes: state.clientes.map((maquilero) =>
            maquilero.id === actualizado.id
              ? actualizado
              : maquilero,
          ),
        }));
      } finally {
        set({ saving: false });
      }
    },

    eliminarCliente: async (id) => {
      if (get().loading || get().saving) {
        throw new Error("Hay una operación en curso.");
      }

      set({ saving: true });

      try {
        await clienteUseCases.eliminar(id);

        set((state) => ({
          clientes: state.clientes.filter(
            (cliente) => cliente.id !== id,
          ),
        }));
      } finally {
        set({ saving: false });
      }
    },
  }),
);