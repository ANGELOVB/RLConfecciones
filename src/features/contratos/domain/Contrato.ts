export interface Contrato {
    id: number
    idCorte: string
    idMaquilero: string
    comentarios: string
    precioMaquilero: string
    fechaCompromisoMaquilero: string
}

export type DetalleContrato = {
    id: number
    comentarios: string
    corte: {
        id: string
        estilo: string
        descripcion: string
        fechaCompromisoMaquilero: string
        precioMaquilero: number 
        estatus: string
    }
    cliente: {
        id: string
        nombre: string
    }
    maquilero: {
        id: number
        nombre: string
        apellidoPaterno: string
        apellidoMaterno: string
    }
}

export type RegistroContrato = {
    id: number
    comentarios: string
    idCorte: string
    estiloCorte: string
    descripcionCorte: string
    fechaCompromisoMaquilero: string
    precioMaquilero: string
    estatusCorte: string
    nombreCliente: string
    idMaquilero: string 
    nombreMaquilero: string
}

export type CrearContrato = {
    idCorte: string
    idMaquilero: number
    comentarios: string
    precioMaquilero: number
    fechaCompromisoMaquilero: string
}

export type ActualizarContrato = CrearContrato & {
    id: number
} 