import { useEffect } from "react";
import { useClienteStore } from "../../../clientes/presentation/stores/clientes.store";
import type { FiltrosCorte } from "../../domain/Cortes";

interface CortesFiltersProps {
  filtros: FiltrosCorte;
  onChange: (filtros: FiltrosCorte) => void;
  onApply: () => void;
  onClear: () => void;
  loading: boolean;
}

const inputClass = `block w-full rounded-lg border border-slate-300 bg-white
  px-3 py-2.5 text-sm text-slate-900 outline-none transition
  focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100
  disabled:bg-slate-50 disabled:text-slate-400`;

export function CortesFilters({
  filtros,
  onChange,
  onApply,
  onClear,
  loading,
}: CortesFiltersProps) {
  const { clientes, cargarClientes } = useClienteStore();

  useEffect(() => {
    void cargarClientes();
  }, [cargarClientes]);

  const setId = (value: string) =>
    onChange({ ...filtros, id: value || undefined });

  const setEstatus = (value: string) =>
    onChange({ ...filtros, estatus: value || undefined });

  const setIdCliente = (value: string) =>
    onChange({ ...filtros, idCliente: value || undefined });

  return (
    <section className="panel mb-5">
      <h2 className="mb-4 text-lg font-bold text-slate-900">Filtros</h2>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          onApply();
        }}
      >
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5 items-center">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-slate-700">
              ID
            </span>
            <input
              type="text"
              value={filtros.id ?? ""}
              onChange={(event) => setId(event.target.value)}
              disabled={loading}
              className={inputClass}
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-slate-700">
              Estatus
            </span>
            <input
              type="text"
              placeholder='Ej. "En Embarque"'
              value={filtros.estatus ?? ""}
              onChange={(event) => setEstatus(event.target.value)}
              disabled={loading}
              className={inputClass}
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-slate-700">
              Cliente
            </span>
            <select
              value={filtros.idCliente ?? ""}
              onChange={(event) => setIdCliente(event.target.value)}
              disabled={loading}
              className={inputClass}
            >
              <option value="">Todos los clientes</option>
              {clientes.map((cliente) => (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.nombre}
                </option>
              ))}
            </select>
          </label>
          <button type="submit" className="h-12 btn-primary" disabled={loading}>
            Filtrar
          </button>

          <button
            type="button"
            className="h-12 btn-secondary"
            disabled={loading}
            onClick={onClear}
          >
            Limpiar
          </button>
        </div>
      </form>
    </section>
  );
}
