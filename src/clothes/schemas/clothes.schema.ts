import { z } from "zod";

export const ClothesMainCatalogSchema = z.object({
    id_prenda: z.number(),
    categoria_prendas: z.string(),
    nombre_prenda: z.string(),
    precio_prenda: z.number(),
    url_imagen: z.string()
})

export type ClothesMainCatalog = z.infer<typeof ClothesMainCatalogSchema>