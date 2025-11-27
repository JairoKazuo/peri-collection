import { z } from "zod";


export const ClothesSchema = z.object({
    id_prenda: z.number(),
    categoria_prendas: z.string(),
    nombre_prenda: z.string(),
    descripcion_prenda: z.string(),
    precio_prenda: z.number(),
    url_imagen: z.string(),
    id_variante: z.number(),
    talla: z.string(),
    color: z.string(),
    sku: z.string(),
    stock_actual: z.number(),
    stock_minimo: z.number(),
    estado: z.enum(["A", "I"]),
    ts_creacion: z.date(),
    ts_actualizacion: z.date()
})

export type Clothes = z.infer<typeof ClothesSchema>



export const ClothesMainCatalogSchema = ClothesSchema.pick({
    id_prenda: true,
    categoria_prendas: true,
    nombre_prenda: true,
    precio_prenda: true,
    url_imagen: true
})


export type ClothesMainCatalog = z.infer<typeof ClothesMainCatalogSchema>