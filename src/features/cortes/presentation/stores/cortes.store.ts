import { create } from "zustand";
import type {
  Corte,
  CrearCorte,
  FiltrosCorte,
} from "../../domain/Cortes";
import { cortesUseCases } from "../../cortes.dependencies";

interface CortesState {
  cortes: Corte[];
  loading: boolean;
  saving: boolean;
  error: string | null;

  cargarCortes: () => Promise<void>;
  cargarCortesConFiltros: (filtros: FiltrosCorte) => Promise<void>;
  agregarCorte: (datos: CrearCorte) => Promise<void>;
  eliminarCorte: (id: string) => Promise<void>;
}

export const useCortesStore = create<CortesState>((set, get) => ({
  cortes: [],
  loading: false,
  saving: false,
  error: null,

  cargarCortes: async () => {
    // Single-operation guard, matches the other features in the project.
    if (get().loading || get().saving) return;

    set({ loading: true, error: null });

    try {
      const cortes = await cortesUseCases.listar();

      set({ cortes });
    } catch {
      set({
        error: "No se pudieron cargar los cortes.",
      });
    } finally {
      set({ loading: false });
    }
  },

  cargarCortesConFiltros: async (filtros) => {
    if (get().loading || get().saving) return;

    set({ loading: true, error: null });

    try {
      const cortes = await cortesUseCases.listarConFiltros(filtros);

      set({ cortes });
    } catch {
      set({
        error: "No se pudieron cargar los cortes filtrados.",
      });
    } finally {
      set({ loading: false });
    }
  },

  agregarCorte: async (datos) => {
    if (get().loading || get().saving) {
      throw new Error("Hay una operación en curso.");
    }

    set({ saving: true, error: null });

    try {
      await cortesUseCases.crear(datos);

      const cortes = await cortesUseCases.listar();

      set({ cortes });
    } finally {
      set({ saving: false });
    }
  },

  eliminarCorte: async (id) => {
    if (get().loading || get().saving) {
      throw new Error("Hay una operación en curso.");
    }

    set({ saving: true });

    try {
      await cortesUseCases.eliminar(id);

      set((state) => ({
        cortes: state.cortes.filter((corte) => corte.id !== id),
      }));
    } finally {
      set({ saving: false });
    }
  },
}));