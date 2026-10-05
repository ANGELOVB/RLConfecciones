import { useState, type ReactNode } from "react";

export interface Column<T> {
  key: keyof T;
  label: string;
  searchable?: boolean;
  render?: (row: T) => ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  getRowId: (row: T) => string | number;
  actions?: (row: T) => ReactNode;
  title?: string;
}

export function DataTable<T>({
  data,
  columns,
  getRowId,
  actions,
  title = "Registros",
}: DataTableProps<T>) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const normalize = (value: unknown) =>
    String(value ?? "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

  const query = normalize(search.trim());

  const filtered = data.filter((row) =>
    columns.some(
      (column) =>
        column.searchable !== false &&
        normalize(row[column.key]).includes(query),
    ),
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * pageSize;
  const visibleRows = filtered.slice(start, start + pageSize);

  return (
    <section className="panel min-w-0">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">{title}</h2>
          <p className="text-sm text-slate-500">
            {filtered.length} de {data.length} registros
          </p>
        </div>

        <label className="text-sm text-slate-600">
          Filas
          <select
            className="ml-2 rounded-lg border border-slate-300 bg-white p-2"
            value={pageSize}
            onChange={(event) => {
              setPageSize(Number(event.target.value));
              setPage(1);
            }}
          >
            {[5, 10, 20, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="mb-5 block">
        <span className="mb-1.5 block text-sm font-medium text-slate-700">
          Buscar
        </span>
        <input
          type="search"
          placeholder="Escribe para filtrar..."
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            setPage(1);
          }}
          className="w-full rounded-lg border border-slate-300 px-3 py-2.5
            text-sm outline-none focus:border-cyan-500
            focus:ring-4 focus:ring-cyan-100"
        />
      </label>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <caption className="sr-only">{title}</caption>

          <thead className="border-b border-slate-200 text-xs uppercase text-slate-500">
            <tr>
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  scope="col"
                  className="whitespace-nowrap px-3 py-3"
                >
                  {column.label}
                </th>
              ))}
              {actions && (
                <th scope="col" className="px-3 py-3 text-right">
                  Acciones
                </th>
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {visibleRows.map((row) => (
              <tr key={getRowId(row)} className="hover:bg-slate-50">
                {columns.map((column) => (
                  <td
                    key={String(column.key)}
                    className="px-3 py-4 text-slate-700"
                  >
                    {column.render
                      ? column.render(row)
                      : String(row[column.key] ?? "—")}
                  </td>
                ))}

                {actions && (
                  <td className="px-3 py-4">
                    <div className="flex justify-end gap-2">{actions(row)}</div>
                  </td>
                )}
              </tr>
            ))}

            {visibleRows.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length + (actions ? 1 : 0)}
                  className="px-3 py-12 text-center text-slate-500"
                >
                  {data.length === 0
                    ? "No hay registros."
                    : "No hay coincidencias para tu búsqueda."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
        <p className="text-sm text-slate-500" aria-live="polite">
          {filtered.length === 0
            ? "0 registros"
            : `${start + 1}–${Math.min(start + pageSize, filtered.length)} de ${filtered.length}`}
        </p>

        <nav aria-label="Paginación" className="flex items-center gap-3">
          <button
            type="button"
            className="btn-secondary"
            disabled={currentPage === 1}
            onClick={() => setPage(currentPage - 1)}
          >
            Anterior
          </button>

          <span className="text-sm text-slate-600">
            {currentPage} / {totalPages}
          </span>

          <button
            type="button"
            className="btn-secondary"
            disabled={currentPage === totalPages}
            onClick={() => setPage(currentPage + 1)}
          >
            Siguiente
          </button>
        </nav>
      </div>
    </section>
  );
}
