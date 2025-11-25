import { z } from "zod";

export const ClientPersonalInfoSchema = z.object({
    nombres_completos: z.string(),
    apellidos_completos: z.string(),
    tipo_documento: z.enum(["DNI","CE"]),
    numero_documento: z.string(),
    telefono: z.string(),
    email: z.string().email()
})

export type ClientPersonalInfo = z.infer<typeof ClientPersonalInfoSchema>

export const ClientDirectionSchema = z.object({
    id_direccion: z.number(),
    calle: z.string(),
    departamento: z.string(),
    provincia: z.string(),
    distrito: z.string(),
    pais: z.string(),
    es_predeterminada: z.boolean()
})

export type ClientDirection = z.infer<typeof ClientDirectionSchema>

export const ClientMethodPaymentSchema = z.object({
    tipo: z.enum(["C", "D"]),
    numero: z.string(),
    ultimos_digitos: z.string(),
    fecha_vencimiento: z.date(),
    codigo_seguridad: z.string(),
    estado: z.string()
})

export type ClientMethodPayment = z.infer<typeof ClientMethodPaymentSchema>