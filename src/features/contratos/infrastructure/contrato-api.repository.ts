import { api } from "../../../lib/api";
import type { Contrato, DetalleContrato } from "../domain/Contrato";
import type {
  ContratoRepository,
} from "../domain/ContratoRepository";

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

export const contratoApiRepository: ContratoRepository = {
  async getList() {
    const respuesta = await api.get<ApiResponse<DetalleContrato[]>>(
      "/contratos/getList",
    );

    return extraerDatos<DetalleContrato[]>(respuesta.data);
  },

  async add(data) {
    const respuesta = await api.post<ApiResponse<Contrato>>(
      "/contratos/add",
      data,
    );

    return extraerDatos<Contrato>(respuesta.data);
  },

  async updateById(data) {
    const respuesta = await api.put<ApiResponse<Contrato>>(
      `/contratos/updateById/${data.id}`,
      data,
    );

    return extraerDatos<Contrato>(respuesta.data);
  },

  async deleteById(id) {
    await api.delete(`/contratos/deleteById/${id}`);
  },

  async generatePDFById(id: number): Promise<Blob> {
    const response = await api.get(`/contratos/generarPDF/${id}`, {
      responseType: "blob",
    });
    return response.data;
  }
};