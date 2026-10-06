import { useEffect, useState } from "react";
import type { CrearContrato, Contrato } from "../../domain/Contrato";
import { ContratoForm } from "../components/ContratoForm";
import { useContratoStore } from "../stores/contrato.store";
import { DataTable } from "../../../../shared/components/DataTable";
import Modal from "../../../../shared/components/Modal";
import ScreenLoader from "../../../../shared/components/ScreenLoader";
import toast from "react-hot-toast";
import { useMaquileroStore } from "../../../maquileros/presentation/stores/maquilero.store";

export function ContratosPage() {
  const {
    contratos,
    loading,
    saving,
    error,
    cargarContratos,
    agregarContrato,
    actualizarContrato,
    eliminarContrato,
    generarPDFContrato
  } = useContratoStore();

  const {maquileros, cargarMaquileros} = useMaquileroStore()

  const [editing, setEditing] = useState<Contrato | null>(null);
  const [formModal, setFormModal] = useState(false);

  useEffect(() => {
    void cargarContratos();
  }, [cargarContratos]);

  useEffect(() => {
    void cargarMaquileros()
  }, [])

  const abrirFormulario = (maquilero: Contrato | null = null) => {
    setEditing(maquilero);
    setFormModal(true);
  };

  const cerrarFormulario = () => {
    if (!saving) setFormModal(false);
  };

  const guardar = async (datos: CrearContrato) => {
    if (editing) {
      await actualizarContrato({ ...datos, id: editing.id });
      toast.success("Contrato actualizado");
    } else {
      await agregarContrato(datos);
      toast.success("Contrato agregado");
    }

    setFormModal(false);
  };

  const eliminar = async (contrato: Contrato) => {
    if (!window.confirm(`¿Eliminar el ${contrato.precioMaquilero}?`)) return;

    try {
      await eliminarContrato(contrato.id);

      if (editing?.id === contrato.id) setEditing(null);

      toast.success("Contrato eliminado");
    } catch {
      toast.error("No se pudo eliminar el contrato");
    }
  };

  const generarPDF = async (contrato: Contrato) => {

    try {
      await generarPDFContrato(contrato.id);

      toast.success("Contrato descargado");
    } catch {
      toast.error("No se pudo descargar el contrato");
    }
  };


  return (
    <main className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 lg:py-12">
      <header className="mb-8 flex flex-wrap items-center justify-between gap-5">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-cyan-600">
            Directorio de producción
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Contratos
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Administra los datos de los contratos.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {!loading && !error && (
            <span className="rounded-full border border-cyan-100 bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-700">
              {contratos.length} registros
            </span>
          )}

          <button
            type="button"
            className="btn-primary"
            disabled={loading || saving || Boolean(error)}
            onClick={() => abrirFormulario()}
          >
            + Agregar contrato
          </button>
        </div>
      </header>

      {loading ? (
        <section className="panel py-16 text-center">
          <p>Cargando contratos...</p>
        </section>
      ) : error ? (
        <section className="panel">
          <p role="alert" className="mb-4 text-rose-600">
            {error}
          </p>

          <button
            type="button"
            className="btn-primary"
            disabled={saving}
            onClick={() => void cargarContratos()}
          >
            Reintentar
          </button>
        </section>
      ) : (
        <fieldset disabled={loading || saving} className="min-w-0">
          <legend className="sr-only">Directorio de contratos</legend>

          {saving && (
            <p role="status" className="mb-4 text-sm text-cyan-600">
              Procesando operación...
            </p>
          )}

          <DataTable
            title="Directorio de contratos"
            data={contratos}
            getRowId={(contrato) => contrato.id}
            columns={[
                { key: "idCorte", label: "Corte" },
                { key: "estiloCorte", label: "Estilo" },
                { key: "descripcionCorte", label: "Descripción" },
                { key: "fechaCompromisoMaquilero", label: "Fecha de compromiso" },
                { key: "precioMaquilero", label: "Precio maquilero" },
                { key: "estatusCorte", label: "Estatus de corte" },
                { key: "nombreCliente", label: "Cliente" },
                { key: "idMaquilero", label: "Id maquilero" },
                { key: "nombreMaquilero", label: "Maquilero" },
            ]}
            actions={(contrato) => (
              <>
                <button
                  type="button"
                  className="btn-info"
                  onClick={() => abrirFormulario(contrato)}
                >
                  Editar
                </button>

                <button
                  type="button"
                  className="btn-danger"
                  onClick={() => eliminar(contrato)}
                >
                  Eliminar
                </button>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => generarPDF(contrato)}
                >
                  Descargar
                </button>
              </>
            )}
          />
        </fieldset>
      )}

      <Modal
        title={editing ? "Editar contrato" : "Agregar contrato"}
        open={formModal}
        busy={saving}
        onClose={cerrarFormulario}
      >
        <ContratoForm editing={editing} onSave={guardar} maquileros={maquileros} />
        <ScreenLoader loading={loading || saving} />
      </Modal>
    </main>
  );
}
