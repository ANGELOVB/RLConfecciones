import { create } from "zustand";
import type {
  CrearContrato,
  ActualizarContrato,
  RegistroContrato,
} from "../../domain/Contrato";
import { contratoUseCases } from "../../contrato.dependencies";

interface ContratoState {
  contratos: RegistroContrato[];
  loading: boolean;
  saving: boolean;
  error: string | null;

  cargarContratos: () => Promise<void>;
  agregarContrato: (datos: CrearContrato) => Promise<void>;
  actualizarContrato: (datos: ActualizarContrato) => Promise<void>;
  eliminarContrato: (id: number) => Promise<void>;
  generarPDFContrato: (id: number) => Promise<void>;
}

function descargarArchivo(blob: Blob, nombre: string) {
  const url = URL.createObjectURL(
    blob.type ? blob : new Blob([blob], { type: "application/pdf" })
  );
  const a = document.createElement("a");
  a.href = url;
  a.download = nombre;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export const useContratoStore = create<ContratoState>(
  (set, get) => ({
    contratos: [],
    loading: false,
    saving: false,
    error: null,

    cargarContratos: async () => {
      if (get().loading || get().saving) return;

      set({ loading: true, error: null });

      
      try {
        const contratosSinProcesar = await contratoUseCases.listar();

        const contratos: RegistroContrato[] = contratosSinProcesar.map((contrato) => ({
          id: contrato.id,
          comentarios: contrato.comentarios ?? "",
          idCorte: contrato.corte?.id ?? "",
          estiloCorte: contrato.corte?.estilo ?? "",
          descripcionCorte: contrato.corte?.descripcion ?? "",
          fechaCompromisoMaquilero: contrato.corte?.fechaCompromisoMaquilero ?? "",
          precioMaquilero: String(contrato.corte?.precioMaquilero ?? ""),
          estatusCorte: contrato.corte?.estatus ?? "",
          nombreCliente: contrato.cliente?.nombre ?? "",
          idMaquilero: String(contrato.maquilero?.id ?? ""),
          nombreMaquilero: [
            contrato.maquilero?.nombre,
            contrato.maquilero?.apellidoPaterno,
            contrato.maquilero?.apellidoMaterno,
          ]
            .filter(Boolean)
            .join(" "),
        }));

        set({ contratos });
      } catch {
        set({
          error: "No se pudieron cargar los contratos.",
        });
      } finally {
        set({ loading: false });
      }
    },

    agregarContrato: async (datos) => {
      if (get().loading || get().saving) {
        throw new Error("Hay una operación en curso.");
      }

      set({ saving: true });

      try {
        await contratoUseCases.crear(datos);

        const contratosSinProcesar = await contratoUseCases.listar();

        const contratos: RegistroContrato[] = contratosSinProcesar.map((contrato) => ({
          id: contrato.id,
          comentarios: contrato.comentarios ?? "",
          idCorte: contrato.corte?.id ?? "",
          estiloCorte: contrato.corte?.estilo ?? "",
          descripcionCorte: contrato.corte?.descripcion ?? "",
          fechaCompromisoMaquilero: contrato.corte?.fechaCompromisoMaquilero ?? "",
          precioMaquilero: String(contrato.corte?.precioMaquilero ?? ""),
          estatusCorte: contrato.corte?.estatus ?? "",
          nombreCliente: contrato.cliente?.nombre ?? "",
          idMaquilero: String(contrato.maquilero?.id ?? ""),
          nombreMaquilero: [
            contrato.maquilero?.nombre,
            contrato.maquilero?.apellidoPaterno,
            contrato.maquilero?.apellidoMaterno,
          ]
            .filter(Boolean)
            .join(" "),
        }));

        set({contratos});
      } catch (error) {
        console.error("Error al guardar:", error);
      } finally {
        set({ saving: false });
      }
    },

    actualizarContrato: async (datos) => {
      if (get().loading || get().saving) {
        throw new Error("Hay una operación en curso.");
      }

      set({ saving: true });

      try {
        await contratoUseCases.actualizar(datos);

        const contratosSinProcesar = await contratoUseCases.listar();

        const contratos: RegistroContrato[] = contratosSinProcesar.map((contrato) => ({
          id: contrato.id,
          comentarios: contrato.comentarios ?? "",
          idCorte: contrato.corte?.id ?? "",
          estiloCorte: contrato.corte?.estilo ?? "",
          descripcionCorte: contrato.corte?.descripcion ?? "",
          fechaCompromisoMaquilero: contrato.corte?.fechaCompromisoMaquilero ?? "",
          precioMaquilero: String(contrato.corte?.precioMaquilero ?? ""),
          estatusCorte: contrato.corte?.estatus ?? "",
          nombreCliente: contrato.cliente?.nombre ?? "",
          idMaquilero: String(contrato.maquilero?.id ?? ""),
          nombreMaquilero: [
            contrato.maquilero?.nombre,
            contrato.maquilero?.apellidoPaterno,
            contrato.maquilero?.apellidoMaterno,
          ]
            .filter(Boolean)
            .join(" "),
        }));

        set({contratos});
      } finally {
        set({ saving: false });
      }
    },

    eliminarContrato: async (id) => {
      if (get().loading || get().saving) {
        throw new Error("Hay una operación en curso.");
      }

      set({ saving: true });

      try {
        await contratoUseCases.eliminar(id);

        set((state) => ({
          contratos: state.contratos.filter(
            (contrato) => contrato.id !== id,
          ),
        }));
      } finally {
        set({ saving: false });
      }
    },

    generarPDFContrato: async (id) => {
      if (get().loading || get().saving) {
        throw new Error("Hay una operación en curso.");
      }

      set({ saving: true });

      try {
        const blob = await contratoUseCases.generarPDF(id);
        descargarArchivo(blob, `contrato-${id}.pdf`);
      } finally {
        set({ saving: false });
      }
    },
  }),
);