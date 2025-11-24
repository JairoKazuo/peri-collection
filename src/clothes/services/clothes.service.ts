import { AxiosError, AxiosInstance } from "axios";

import { ClothesMainCatalog } from "../schemas/clothes.schema";
import { CLOTHES_ENDPOINTS } from "./endpoints";

export const makeClothesService = (API_CLOTHES: AxiosInstance) => ({
  async getMainCatalog(): Promise<ClothesMainCatalog[]> {

    try {
      const response = await API_CLOTHES.get<{
        status: string;
        code: number;
        message: string;
        prendas: Array<{
          id_prenda: number;
          categoria_prenda: string;
          nombre_prenda: string;
          precio_prenda: string; // viene como string
          imagen_prenda: string;
        }>;
      }>(CLOTHES_ENDPOINTS.getMainCatalog);

      console.log("Respuesta cruda de /catalogo:", response.data);

      const raw = response.data?.prendas ?? [];

      const mapped: ClothesMainCatalog[] = raw.map((item) => ({
        id_prenda: item.id_prenda,
        categoria_prendas: item.categoria_prenda,
        nombre_prenda: item.nombre_prenda,
        precio_prenda: Number(item.precio_prenda),
        url_imagen: item.imagen_prenda,
      }));

      console.log("Productos mapeados en service:", mapped);

      return mapped;
    } catch (error) {
      const axiosErr = error as AxiosError<any>;
      const statusCode = axiosErr.response?.status;
      const backendCode = (axiosErr.response?.data as any)?.code;

      // Si el backend usa 404 para "catálogo no encontrado", tratamos como lista vacía
      if (statusCode === 404 && backendCode === 404) {
        return [];
      }

      throw error;
    }
  },
});