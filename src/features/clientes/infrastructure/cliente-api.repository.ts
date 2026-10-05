import { api } from "../../../lib/api";
import type { Cliente } from "../domain/Cliente";
import type {
  ClienteRepository,
} from "../domain/ClienteRepository";

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

export const clienteApiRepository: ClienteRepository = {
  async getList() {
    const respuesta = await api.get<ApiResponse<Cliente[]>>(
      "/clientes/getList",
    );

    return extraerDatos<Cliente[]>(respuesta.data);
  },

  async add(data) {
    const respuesta = await api.post<ApiResponse<Cliente>>(
      "/clientes/add",
      data,
    );

    return extraerDatos<Cliente>(respuesta.data);
  },

  async updateById(data) {
    const respuesta = await api.put<ApiResponse<Cliente>>(
      `/clientes/updateById/${data.id}`,
      data,
    );

    return extraerDatos<Cliente>(respuesta.data);
  },

  async deleteById(id) {
    await api.delete(`/clientes/deleteById/${id}`);
  },
};