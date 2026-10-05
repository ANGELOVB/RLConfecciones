import { create } from "zustand";
import type {
  CrearMaquilero,
  Maquilero,
} from "../../domain/Maquilero";
import { maquileroUseCases } from "../../maquilero.dependencies";

interface MaquileroState {
  maquileros: Maquilero[];
  loading: boolean;
  saving: boolean;
  error: string | null;

  cargarMaquileros: () => Promise<void>;
  agregarMaquilero: (datos: CrearMaquilero) => Promise<void>;
  actualizarMaquilero: (datos: Maquilero) => Promise<void>;
  eliminarMaquilero: (id: number) => Promise<void>;
}

export const useMaquileroStore = create<MaquileroState>(
  (set, get) => ({
    maquileros: [],
    loading: false,
    saving: false,
    error: null,

    cargarMaquileros: async () => {
      // Esta primera implementación ejecuta una operación a la vez.
      if (get().loading || get().saving) return;

      set({ loading: true, error: null });

      try {
        const maquileros = await maquileroUseCases.listar();

        set({ maquileros });
      } catch {
        set({
          error: "No se pudieron cargar los maquileros.",
        });
      } finally {
        set({ loading: false });
      }
    },

    agregarMaquilero: async (datos) => {
      if (get().loading || get().saving) {
        throw new Error("Hay una operación en curso.");
      }

      set({ saving: true });

      try {
        const nuevo = await maquileroUseCases.crear(datos);

        set((state) => ({
          maquileros: [...state.maquileros, nuevo],
        }));
      } finally {
        set({ saving: false });
      }
    },

    actualizarMaquilero: async (datos) => {
      if (get().loading || get().saving) {
        throw new Error("Hay una operación en curso.");
      }

      set({ saving: true });

      try {
        const actualizado =
          await maquileroUseCases.actualizar(datos);

        set((state) => ({
          maquileros: state.maquileros.map((maquilero) =>
            maquilero.id === actualizado.id
              ? actualizado
              : maquilero,
          ),
        }));
      } finally {
        set({ saving: false });
      }
    },

    eliminarMaquilero: async (id) => {
      if (get().loading || get().saving) {
        throw new Error("Hay una operación en curso.");
      }

      set({ saving: true });

      try {
        await maquileroUseCases.eliminar(id);

        set((state) => ({
          maquileros: state.maquileros.filter(
            (maquilero) => maquilero.id !== id,
          ),
        }));
      } finally {
        set({ saving: false });
      }
    },
  }),
);