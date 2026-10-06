import { api } from "../../../lib/api";
import type { Corte } from "../domain/Cortes";
import type { CortesRepository } from "../domain/CortesRepository";

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

export const cortesApiRepository: CortesRepository = {
  async getList() {
    const respuesta = await api.get<ApiResponse<Corte[]>>(
      "/cortes/getList",
    );

    return extraerDatos<Corte[]>(respuesta.data);
  },

  async getListWithFilter(filtros) {
    const respuesta = await api.put<ApiResponse<Corte[]>>(
      "/cortes/getListWithFilter",
      filtros,
    );

    return extraerDatos<Corte[]>(respuesta.data);
  },

  async getById(id) {
    const respuesta = await api.get<ApiResponse<Corte>>(
      `/cortes/getById/${id}`,
    );

    return extraerDatos<Corte>(respuesta.data);
  },

  async add(data) {
    const respuesta = await api.post<ApiResponse<Corte>>(
      "/cortes/add",
      data,
    );

    return extraerDatos<Corte>(respuesta.data);
  },

  async deleteById(id) {
    await api.delete(`/cortes/deleteById/${id}`);
  },
};