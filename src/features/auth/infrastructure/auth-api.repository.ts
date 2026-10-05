import { api } from "../../../lib/api";
import type { AuthUser } from "../domain/Auth";
import type { AuthRepository } from "../domain/AuthRepository";

interface LoginResponse {
  user?: AuthUser;
  token?: string;
  tipo: string;
  msj: string;
}

export const authApiRepository: AuthRepository = {
  async login(data) {
    const { data: respuesta } = await api.post<LoginResponse>(
      "/auth/login",
      data,
    );

    if (respuesta.tipo !== "success" || !respuesta.user) {
      throw new Error(respuesta.msj || "No se pudo iniciar sesión.");
    }

    // Simulación temporal: solo cuando ejecutamos en desarrollo.
    const token =
      respuesta.token ||
      (import.meta.env.DEV ? "TOKEN_SIMULADO_DESARROLLO" : "");

    if (!token) {
      throw new Error("La API no devolvió un token.");
    }

    return {
      user: respuesta.user,
      token,
      menu:[],
      accesos:[]
    };
  },
};