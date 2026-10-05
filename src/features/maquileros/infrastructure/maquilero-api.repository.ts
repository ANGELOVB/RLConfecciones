import { api } from "../../../lib/api";
import type { Maquilero } from "../domain/Maquilero";
import type {
  MaquileroRepository,
} from "../domain/MaquileroRepository";

// Conservamos los dos formatos que manejaba tu proyecto anterior.
// Todavía falta confirmar cuál devuelve cada endpoint.
type ApiResponse<T> = T | { data: T };

function extraerDatos<T>(respuesta: ApiResponse<T>): T {
  if (
    typeof respuesta === "object" &&
    respuesta !== null &&
    "data" in respuesta
  ) {
    return respuesta.data;
  }

  return respuesta as T;
}

export const maquileroApiRepository: MaquileroRepository = {
  async getList() {
    const respuesta = await api.get<ApiResponse<Maquilero[]>>(
      "/maquileros/getList",
    );

    return extraerDatos<Maquilero[]>(respuesta.data);
  },

  async add(data) {
    const respuesta = await api.post<ApiResponse<Maquilero>>(
      "/maquileros/add",
      data,
    );

    return extraerDatos<Maquilero>(respuesta.data);
  },

  async updateById(data) {
    const respuesta = await api.put<ApiResponse<Maquilero>>(
      `/maquileros/updateById/${data.id}`,
      data,
    );

    return extraerDatos<Maquilero>(respuesta.data);
  },

  async deleteById(id) {
    await api.delete(`/maquileros/deleteById/${id}`);
  },
};