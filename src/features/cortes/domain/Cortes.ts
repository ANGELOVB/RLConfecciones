import type { Cliente } from "../../clientes/domain/Cliente";

// Corte 
export interface Corte {
  id: string;
  estilo: string;
  descripcion: string;
  totalBolsas: number;
  totalBolsasAlmacen: number;
  totalPiezas: number;
  totalPiezasTerminado: number;
  recibidas: number;
  muestras: number;
  incompletas: number;
  faltantes: number;
  composicionTela: string;
  fechaRecepcionAlmacen: string | null;
  fechaEntregaMaquilero: string | null;
  fechaCompromisoMaquilero: string | null;
  fechaCompromisoCliente: string | null;
  precioImportacion: number;
  precioMaquilero: number;
  precioExportacion: number;
  descuentoImpuestos: number;
  adelanto: number;
  nombreFacturacion: string | null;
  estatus: string;
  comentarios: string | null;
  idCliente: string;
  created_at: string;
  updated_at: string;
  totalPiezasDesgloce: number;
  totalPiezasPagadas: number;
  cliente: Cliente;
}

// CrearCorte 
export type CrearCorte = Pick<
  Corte,
  | "id"
  | "estilo"
  | "descripcion"
  | "composicionTela"
  | "idCliente"
  | "totalBolsas"
  | "totalPiezas"
>;

// FiltrosCorte 
export interface FiltrosCorte {
  id?: string;
  estatus?: string;
  idCliente?: string;
}