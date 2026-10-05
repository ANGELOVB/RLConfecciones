import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  maquileroSchema,
  type MaquileroFormValues,
} from "../schemas/maquilero.schema";
import type { Maquilero } from "../../domain/Maquilero";

interface MaquileroFormProps {
  editing: Maquilero | null;
  onSave: (datos: MaquileroFormValues) => Promise<void>;
}

const campos = [
  { name: "nombre", label: "Nombre", type: "text" },
  { name: "apellidoPaterno", label: "Apellido paterno", type: "text" },
  { name: "apellidoMaterno", label: "Apellido materno", type: "text" },
  { name: "direccion", label: "Dirección", type: "text" },
  { name: "telefono1", label: "Teléfono principal", type: "tel" },
  { name: "telefono2", label: "Teléfono secundario", type: "tel" },
] as const;

export function MaquileroForm({ editing, onSave }: MaquileroFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<MaquileroFormValues>({
    resolver: zodResolver(maquileroSchema),
    defaultValues: {
      nombre: "",
      apellidoPaterno: "",
      apellidoMaterno: "",
      direccion: "",
      telefono1: "",
      telefono2: "",
    },
  });

  // Carga el registro seleccionado o limpia los campos al agregar.
  useEffect(() => {
    reset({
      nombre: editing?.nombre ?? "",
      apellidoPaterno: editing?.apellidoPaterno ?? "",
      apellidoMaterno: editing?.apellidoMaterno ?? "",
      direccion: editing?.direccion ?? "",
      telefono1: editing?.telefono1 ?? "",
      telefono2: editing?.telefono2 ?? "",
    });
  }, [editing, reset]);

  const guardar = async (datos: MaquileroFormValues) => {
    clearErrors("root");

    try {
      await onSave(datos);
    } catch {
      setError("root", {
        message: "No se pudo guardar el maquilero. Inténtalo de nuevo.",
      });
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit(guardar)} noValidate>
      <fieldset disabled={isSubmitting}>
        <legend>Datos del maquilero</legend>

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
