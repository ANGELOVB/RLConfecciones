export interface Maquilero {
  id: number;
  nombre: string;
  apellidoMaterno: string;
  apellidoPaterno: string;
  direccion: string;
  telefono1: string;
  telefono2: string;
}

export type CrearMaquilero = Omit<Maquilero, "id">;