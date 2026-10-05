import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Cliente } from "../../domain/Cliente";
import {
  clienteSchema,
  type ClienteFormValues,
} from "../schemas/clientes.schema";

interface ClienteFormProps {
  editing: Cliente | null;
  onSave: (datos: ClienteFormValues) => Promise<void>;
}

const campos = [
  { name: "id", label: "Identificador", type: "text" },
  { name: "nombre", label: "Nombre", type: "text" },
  { name: "direccion", label: "Dirección", type: "text" },
] as const;

export function ClienteForm({ editing, onSave }: ClienteFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<ClienteFormValues>({
    resolver: zodResolver(clienteSchema),
    defaultValues: {
      id: "",
      nombre: "",
      direccion: "",
    },
  });

  // Carga el registro seleccionado o limpia los campos al agregar.
  useEffect(() => {
    reset({
      id: editing?.id ?? "",
      nombre: editing?.nombre ?? "",
      direccion: editing?.direccion ?? "",
    });
  }, [editing, reset]);

  const guardar = async (datos: ClienteFormValues) => {
    clearErrors("root");

    try {
      await onSave(datos);
    } catch {
      setError("root", {
        message: "No se pudo guardar el cliente. Inténtalo de nuevo.",
      });
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit(guardar)} noValidate>
      <fieldset disabled={isSubmitting}>
        <legend>Datos del cliente</legend>

        {campos.map((campo) => (
          <div key={campo.name}>
            <label htmlFor={campo.name}>{campo.label}</label>

            <input
              id={campo.name}
              type={campo.type}
              {...register(campo.name)}
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

        <button type="submit">
          {isSubmitting
            ? "Guardando..."
            : editing
              ? "Guardar cambios"
              : "Agregar"}
        </button>
      </fieldset>

      {errors.root && <p role="alert">{errors.root.message}</p>}
    </form>
  );
}
