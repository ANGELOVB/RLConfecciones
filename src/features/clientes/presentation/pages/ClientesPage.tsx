import { useEffect, useState } from "react";
import { DataTable } from "../../../../shared/components/DataTable";
import Modal from "../../../../shared/components/Modal";
import ScreenLoader from "../../../../shared/components/ScreenLoader";
import toast from "react-hot-toast";
import { useClienteStore } from "../stores/clientes.store";
import type { Cliente } from "../../domain/Cliente";
import { ClienteForm } from "../components/ClienteForm";

export function ClientesPage() {
  const {
    clientes,
    cargarClientes,
    loading,
    saving,
    error,
    agregarCliente,
    actualizarCliente,
    eliminarCliente,
  } = useClienteStore();

  const [editing, setEditing] = useState<Cliente | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    void cargarClientes();
  }, [cargarClientes]);

  const abrirFormulario = (cliente: Cliente | null = null) => {
    setEditing(cliente);
    setOpen(true);
  };

  const cerrarFormulario = () => {
    if (!saving) setOpen(false);
  };

  const guardar = async (datos: Cliente) => {
    if (editing) {
      await actualizarCliente({ ...datos, id: editing.id });
      toast.success("Cliente actualizado");
    } else {
      await agregarCliente(datos);
      toast.success("Cliente agregado");
    }

    setOpen(false);
  };

  const eliminar = async (cliente: Cliente) => {
    if (!window.confirm(`¿Eliminar a ${cliente.nombre}?`)) return;

    try {
      await eliminarCliente(cliente.id);

      if (editing?.id === cliente.id) setEditing(null);

      toast.success("Cliente eliminado");
    } catch {
      toast.error("No se pudo eliminar el cliente");
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
            Clientes
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Administra los datos de los clientes.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {!loading && !error && (
            <span className="rounded-full border border-cyan-100 bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-700">
              {clientes.length} registros
            </span>
          )}

          <button
            type="button"
            className="btn-primary"
            disabled={loading || saving || Boolean(error)}
            onClick={() => abrirFormulario()}
          >
            + Agregar cliente
          </button>
        </div>
      </header>

      {loading ? (
        <section className="panel py-16 text-center">
          <p>Cargando clientes...</p>
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
            onClick={() => void cargarClientes()}
          >
            Reintentar
          </button>
        </section>
      ) : (
        <fieldset disabled={loading || saving} className="min-w-0">
          <legend className="sr-only">Directorio de clientes</legend>

          {saving && (
            <p role="status" className="mb-4 text-sm text-cyan-600">
              Procesando operación...
            </p>
          )}

          <DataTable
            title="Directorio de clientes"
            data={clientes}
            getRowId={(cliente) => cliente.id}
            columns={[
              { key: "id", label: "Clave" },
              { key: "nombre", label: "Nombre" },
              { key: "direccion", label: "Dirección" },
            ]}
            actions={(cliente) => (
              <>
                <button
                  type="button"
                  className="btn-info"
                  onClick={() => abrirFormulario(cliente)}
                >
                  Editar
                </button>

                <button
                  type="button"
                  className="btn-danger"
                  onClick={() => eliminar(cliente)}
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
        open={open}
        busy={saving}
        onClose={cerrarFormulario}
      >
        <ClienteForm editing={editing} onSave={guardar} />
        <ScreenLoader loading={loading || saving} />
      </Modal>
    </main>
  );
}
