import { useEffect, useState } from "react";
import type { CrearMaquilero, Maquilero } from "../../domain/Maquilero";
import { MaquileroForm } from "../components/MaquileroForm";
import { useMaquileroStore } from "../stores/maquilero.store";
import { DataTable } from "../../../../shared/components/DataTable";
import Modal from "../../../../shared/components/Modal";
import ScreenLoader from "../../../../shared/components/ScreenLoader";
import toast from "react-hot-toast";

export function MaquilerosPage() {
  const {
    maquileros,
    loading,
    saving,
    error,
    cargarMaquileros,
    agregarMaquilero,
    actualizarMaquilero,
    eliminarMaquilero,
  } = useMaquileroStore();

  const [editing, setEditing] = useState<Maquilero | null>(null);
  const [formModal, setFormModal] = useState(false);
  const [eliminarMaqModal, setEliminarMaqModal] = useState(false);

  useEffect(() => {
    void cargarMaquileros();
  }, [cargarMaquileros]);

  const abrirFormulario = (maquilero: Maquilero | null = null) => {
    setEditing(maquilero);
    setFormModal(true);
  };

  const cerrarFormulario = () => {
    if (!saving) setFormModal(false);
  };

  const guardar = async (datos: CrearMaquilero) => {
    if (editing) {
      await actualizarMaquilero({ ...datos, id: editing.id });
      toast.success("Maquilero actualizado");
    } else {
      await agregarMaquilero(datos);
      toast.success("Maquilero agregado");
    }

    setFormModal(false);
  };

  const eliminar = async (maquilero: Maquilero) => {
    if (!window.confirm(`¿Eliminar a ${maquilero.nombre}?`)) return;

    try {
      await eliminarMaquilero(maquilero.id);

      if (editing?.id === maquilero.id) setEditing(null);

      toast.success("Maquilero eliminado");
    } catch {
      toast.error("No se pudo eliminar el maquilero");
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
            Maquileros
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Administra los datos de los maquileros externos.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {!loading && !error && (
            <span className="rounded-full border border-cyan-100 bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-700">
              {maquileros.length} registros
            </span>
          )}

          <button
            type="button"
            className="btn-primary"
            disabled={loading || saving || Boolean(error)}
            onClick={() => abrirFormulario()}
          >
            + Agregar maquilero
          </button>
        </div>
      </header>

      {loading ? (
        <section className="panel py-16 text-center">
          <p>Cargando maquileros...</p>
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
            onClick={() => void cargarMaquileros()}
          >
            Reintentar
          </button>
        </section>
      ) : (
        <fieldset disabled={loading || saving} className="min-w-0">
          <legend className="sr-only">Directorio de maquileros</legend>

          {saving && (
            <p role="status" className="mb-4 text-sm text-cyan-600">
              Procesando operación...
            </p>
          )}

          <DataTable
            title="Directorio de maquileros"
            data={maquileros}
            getRowId={(maquilero) => maquilero.id}
            columns={[
              { key: "nombre", label: "Nombre" },
              { key: "apellidoPaterno", label: "Apellido paterno" },
              { key: "apellidoMaterno", label: "Apellido materno" },
              { key: "direccion", label: "Dirección" },
              { key: "telefono1", label: "Teléfono" },
              { key: "telefono2", label: "Teléfono Secundario" },
            ]}
            actions={(maquilero) => (
              <>
                <button
                  type="button"
                  className="btn-info"
                  onClick={() => abrirFormulario(maquilero)}
                >
                  Editar
                </button>

                <button
                  type="button"
                  className="btn-danger"
                  onClick={() => eliminar(maquilero)}
                >
                  Eliminar
                </button>
              </>
            )}
          />
        </fieldset>
      )}

      <Modal
        title={editing ? "Editar maquilero" : "Agregar maquilero"}
        open={formModal}
        busy={saving}
        onClose={cerrarFormulario}
      >
        <MaquileroForm editing={editing} onSave={guardar} />
        <ScreenLoader loading={loading || saving} />
      </Modal>
    </main>
  );
}
