import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  cortesSchema,
  type CortesFormValues,
} from "../schemas/cortes.schema";
import { useClienteStore } from "../../../clientes/presentation/stores/clientes.store";

interface CortesFormProps {
  onSave: (datos: CortesFormValues) => Promise<void>;
}

const campos = [
  { name: "id", label: "Identificador", type: "text", valueAsNumber: false },
  { name: "estilo", label: "Estilo", type: "text", valueAsNumber: false },
  {
    name: "descripcion",
    label: "Descripción",
    type: "text",
    valueAsNumber: false,
  },
  {
    name: "composicionTela",
    label: "Composición de tela",
    type: "text",
    valueAsNumber: false,
  },
  {
    name: "totalBolsas",
    label: "Total bolsas",
    type: "number",
    valueAsNumber: true,
  },
  {
    name: "totalPiezas",
    label: "Total piezas",
    type: "number",
    valueAsNumber: true,
  },
] as const;

export function CortesForm({ onSave }: CortesFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<CortesFormValues>({
    resolver: zodResolver(cortesSchema),
    defaultValues: {
      id: "",
      estilo: "",
      descripcion: "",
      composicionTela: "",
      idCliente: "",
      totalBolsas: 0,
      totalPiezas: 0,
    },
  });

  const { clientes, cargarClientes, loading: loadingClientes } =
    useClienteStore();

  useEffect(() => {
    void cargarClientes();
  }, [cargarClientes]);

  useEffect(() => {
    reset({
      id: "",
      estilo: "",
      descripcion: "",
      composicionTela: "",
      idCliente: "",
      totalBolsas: 0,
      totalPiezas: 0,
    });
  }, [reset]);

  const guardar = async (datos: CortesFormValues) => {
    clearErrors("root");

    try {
      await onSave(datos);

      reset();
    } catch {
      setError("root", {
        message: "No se pudo guardar el corte. Inténtalo de nuevo.",
      });
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit(guardar)} noValidate>
      <fieldset disabled={isSubmitting}>
        <legend>Datos del corte</legend>

        {campos.map((campo) => (
          <div key={campo.name}>
            <label htmlFor={campo.name}>{campo.label}</label>

            <input
              id={campo.name}
              type={campo.type}
              {...register(
                campo.name,
                campo.valueAsNumber
                  ? { valueAsNumber: true }
                  : undefined,
              )}
              aria-invalid={Boolean(errors[campo.name])}
              aria-describedby={
                errors[campo.name] ? `${campo.name}-error` : undefined
              }
            />

            {errors[campo.name] && (
              <p id={`${campo.name}-error`} role="alert">
                {errors[campo.name]?.message}
              </p>
            )}
          </div>
        ))}

        <div>
          <label htmlFor="idCliente">Cliente</label>

          <select
            id="idCliente"
            disabled={loadingClientes}
            {...register("idCliente")}
            aria-invalid={Boolean(errors.idCliente)}
            aria-describedby={
              errors.idCliente ? "idCliente-error" : undefined
            }
          >
            <option value="">
              {loadingClientes
                ? "Cargando clientes..."
                : "Selecciona un cliente"}
            </option>

            {clientes.map((cliente) => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.nombre}
              </option>
            ))}
          </select>

          {errors.idCliente && (
            <p id="idCliente-error" role="alert">
              {errors.idCliente?.message}
            </p>
          )}
        </div>

        <button type="submit">
          {isSubmitting ? "Guardando..." : "Agregar"}
        </button>
      </fieldset>

      {errors.root && <p role="alert">{errors.root.message}</p>}
    </form>
  );
}