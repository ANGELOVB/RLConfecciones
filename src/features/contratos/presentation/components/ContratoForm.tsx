import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  contratoSchema,
  type ContratoFormValues,
  type ContratoPayload,
} from "../schemas/contrato.schema";
import type { Contrato } from "../../domain/Contrato";
import type { Maquilero } from "../../../maquileros/domain/Maquilero";

interface ContratoFormProps {
  editing: Contrato | null;
  onSave: (datos: ContratoPayload) => Promise<void>;
  maquileros: Maquilero[];
}

export function ContratoForm({ editing, onSave, maquileros }: ContratoFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<ContratoFormValues, unknown, ContratoPayload>({
    resolver: zodResolver(contratoSchema),
    defaultValues: {
      idCorte: "",
      idMaquilero: "",
      comentarios: "",
      precioMaquilero: "",
      fechaCompromisoMaquilero: "",
    },
  });

  useEffect(() => {
    reset({
      idCorte: editing?.idCorte ?? "",
      idMaquilero: editing ? String(editing.idMaquilero) : "",
      comentarios: editing?.comentarios ?? "",
      precioMaquilero: editing ? String(editing.precioMaquilero) : "",
      // El input date necesita YYYY-MM-DD
      fechaCompromisoMaquilero: (editing?.fechaCompromisoMaquilero ?? "").replace(/\//g, "-"),
    });
  }, [editing, reset]);

  const guardar = async (datos: ContratoPayload) => {
    clearErrors("root");

    try {
      await onSave(datos);
    } catch {
      setError("root", {
        message: "No se pudo guardar el contrato. Inténtalo de nuevo.",
      });
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit(guardar)} noValidate>
      <fieldset disabled={isSubmitting}>
        <legend>Datos del contrato</legend>

        <div>
          <label htmlFor="idCorte">Corte</label>
          <input
            id="idCorte"
            type="text"
            {...register("idCorte")}
            aria-invalid={Boolean(errors.idCorte)}
            aria-describedby={errors.idCorte ? "idCorte-error" : undefined}
          />
          {errors.idCorte && (
            <p id="idCorte-error" role="alert">
              {errors.idCorte.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="idMaquilero">Maquilero</label>
          <select
            id="idMaquilero"
            {...register("idMaquilero")}
            aria-invalid={Boolean(errors.idMaquilero)}
            aria-describedby={errors.idMaquilero ? "idMaquilero-error" : undefined}
          >
            <option value="">Selecciona un maquilero</option>
            {maquileros.map((m) => (
              <option key={m.id} value={String(m.id)}>
                {[m.nombre, m.apellidoPaterno, m.apellidoMaterno]
                  .filter(Boolean)
                  .join(" ")}
              </option>
            ))}
          </select>
          {errors.idMaquilero && (
            <p id="idMaquilero-error" role="alert">
              {errors.idMaquilero.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="comentarios">Comentarios</label>
          <input
            id="comentarios"
            type="text"
            {...register("comentarios")}
            aria-invalid={Boolean(errors.comentarios)}
            aria-describedby={errors.comentarios ? "comentarios-error" : undefined}
          />
          {errors.comentarios && (
            <p id="comentarios-error" role="alert">
              {errors.comentarios.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="precioMaquilero">Precio maquilero</label>
          <input
            id="precioMaquilero"
            type="text"
            inputMode="decimal"
            {...register("precioMaquilero")}
            aria-invalid={Boolean(errors.precioMaquilero)}
            aria-describedby={errors.precioMaquilero ? "precioMaquilero-error" : undefined}
          />
          {errors.precioMaquilero && (
            <p id="precioMaquilero-error" role="alert">
              {errors.precioMaquilero.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="fechaCompromisoMaquilero">Fecha de compromiso</label>
          <input
            id="fechaCompromisoMaquilero"
            type="date"
            {...register("fechaCompromisoMaquilero")}
            aria-invalid={Boolean(errors.fechaCompromisoMaquilero)}
            aria-describedby={
              errors.fechaCompromisoMaquilero ? "fechaCompromisoMaquilero-error" : undefined
            }
          />
          {errors.fechaCompromisoMaquilero && (
            <p id="fechaCompromisoMaquilero-error" role="alert">
              {errors.fechaCompromisoMaquilero.message}
            </p>
          )}
        </div>

        <button type="submit">
          {isSubmitting ? "Guardando..." : editing ? "Guardar cambios" : "Agregar"}
        </button>
      </fieldset>

      {errors.root && <p role="alert">{errors.root.message}</p>}
    </form>
  );
}