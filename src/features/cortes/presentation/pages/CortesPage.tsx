import { useEffect, useState } from "react";
import { DataTable } from "../../../../shared/components/DataTable";
import Modal from "../../../../shared/components/Modal";
import ScreenLoader from "../../../../shared/components/ScreenLoader";
import toast from "react-hot-toast";
import { useCortesStore } from "../stores/cortes.store";
import type { Corte, CrearCorte, FiltrosCorte } from "../../domain/Cortes";
import { CortesForm } from "../components/CortesForm";
import { CortesFilters } from "../components/CortesFilters";

export function CortesPage() {
  const {
    cortes,
    cargarCortes,
    cargarCortesConFiltros,
    loading,
    saving,
    error,
    agregarCorte,
    eliminarCorte,
  } = useCortesStore();

  const [open, setOpen] = useState(false);
  const [filtros, setFiltros] = useState<FiltrosCorte>({});

  useEffect(() => {
    void cargarCortes();
  }, [cargarCortes]);

  const cerrarFormulario = () => {
    if (!saving) setOpen(false);
  };

  const guardar = async (datos: CrearCorte) => {
    try {
      await agregarCorte(datos);

      toast.success("Corte agregado");

      setOpen(false);
    } catch {
      toast.error("No se pudo guardar el corte");
    }
  };

  const eliminar = async (corte: Corte) => {
    if (!window.confirm(`¿Eliminar el corte ${corte.id}?`)) return;

    try {
      await eliminarCorte(corte.id);

      toast.success("Corte eliminado");
    } catch {
      toast.error("No se pudo eliminar el corte");
    }
  };

  const aplicarFiltros = () => {
    void cargarCortesConFiltros(filtros);
  };

  const limpiarFiltros = () => {
    setFiltros({});
    void cargarCortes();
  };

  return (
    <main className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 lg:py-12">
      <header className="mb-8 flex flex-wrap items-center justify-between gap-5">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-cyan-600">
            Producción
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Cortes
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Administra los cortes asignados a cada cliente.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {!loading && !error && (
            <span className="rounded-full border border-cyan-100 bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-700">
              {cortes.length} registros
            </span>
          )}

          <button
            type="button"
            className="btn-primary"
            disabled={loading || saving || Boolean(error)}
            onClick={() => setOpen(true)}
          >
            + Agregar corte
          </button>
        </div>
      </header>

      <CortesFilters
        filtros={filtros}
        onChange={setFiltros}
        onApply={aplicarFiltros}
        onClear={limpiarFiltros}
        loading={loading}
      />

      {loading ? (
        <section className="panel py-16 text-center">
          <p>Cargando cortes...</p>
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
            onClick={() => void cargarCortes()}
          >
            Reintentar
          </button>
        </section>
      ) : (
        <fieldset disabled={loading || saving} className="min-w-0">
          <legend className="sr-only">Directorio de cortes</legend>

          {saving && (
            <p role="status" className="mb-4 text-sm text-cyan-600">
              Procesando operación...
            </p>
          )}

          <DataTable
            title="Producción de cortes"
            data={cortes}
            getRowId={(corte) => corte.id}
            columns={[
              { key: "id", label: "Clave" },
              { key: "estilo", label: "Estilo" },
              { key: "descripcion", label: "Descripción" },
              {
                key: "cliente",
                label: "Cliente",
                render: (corte) => corte.cliente?.nombre ?? "—",
              },
              { key: "estatus", label: "Estatus" },
              { key: "totalPiezas", label: "Piezas" },
            ]}
            actions={(corte) => (
              <button
                type="button"
                className="btn-danger"
                onClick={() => eliminar(corte)}
              >
                Eliminar
              </button>
            )}
          />
        </fieldset>
      )}

      <Modal
        title="Agregar corte"
        open={open}
        busy={saving}
        onClose={cerrarFormulario}
      >
        <CortesForm onSave={guardar} />
        <ScreenLoader loading={loading || saving} />
      </Modal>
    </main>
  );
}