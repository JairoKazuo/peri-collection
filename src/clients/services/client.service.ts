import { CLIENT_ENDPOINTS } from "./endpoints";

import { AxiosInstance, AxiosError } from "axios";
import { ClientPersonalInfo, ClientDirection, ClientMethodPayment } from "../schemas/client.schema";

export const makeClientService = (API_CLIENT: AxiosInstance) => ({
    async getPersonalInfo() {
        const response = await API_CLIENT.get<{
            status: string;
            code: number;
            message: string;
            datos_personales: Array<{
                id_usuario: number;
                nombres_completos: string | null;
                apellidos_completos: string | null;
                tipo_documento: "DNI" | "CE";
                numero_documento: string;
                telefono: string;
                email: string;
            }>;
        }>(CLIENT_ENDPOINTS.getPersonalInfo);

        const first = response.data?.datos_personales?.[0];

        if (!first) {
            // Si no hay datos, devolvemos null y dejamos que el hook lo maneje
            return null as unknown as ClientPersonalInfo;
        }

        const mapped: ClientPersonalInfo = {
            nombres_completos: first.nombres_completos ?? "",
            apellidos_completos: first.apellidos_completos ?? "",
            tipo_documento: first.tipo_documento,
            numero_documento: first.numero_documento.trim(),
            telefono: first.telefono,
            email: first.email,
        };

        return mapped;
    },
    async getDirections() {
        try {
            const response = await API_CLIENT.get<{
                status: string;
                code: number;
                message: string;
                direcciones: Array<{
                    id_direccion: number;
                    id_usuario: number;
                    calle: string;
                    departamento: string;
                    provincia: string;
                    distrito: string;
                    pais: string;
                    es_predenterminada: boolean;
                }>;
            }>(CLIENT_ENDPOINTS.getDirections);

            const raw = response.data?.direcciones ?? [];

            const mapped: ClientDirection[] = raw.map((dir) => ({
                calle: dir.calle,
                departamento: dir.departamento,
                provincia: dir.provincia,
                distrito: dir.distrito,
                pais: dir.pais,
                es_predeterminada: dir.es_predenterminada,
            }));

            return mapped;
        } catch (error) {
            const axiosErr = error as AxiosError<any>;
            const statusCode = axiosErr.response?.status;
            const backendCode = (axiosErr.response?.data as any)?.code;
            const backendMessage = (axiosErr.response?.data as any)?.message;

            // Caso: el usuario no tiene direcciones aún
            if (statusCode === 404 && backendCode === 404 && backendMessage === "Direcciones no encontradas") {
                return [];
            }

            throw error;
        }
    },
    async getPaymentMethods() {
        try {
            const response = await API_CLIENT.get<{
                status: string;
                code: number;
                message: string;
                metodos_pago: Array<{
                    tipo: "C" | "D";
                    numero: string;
                    ultimos_digitos: string;
                    fecha_vencimiento: string; // viene como string desde el backend
                    codigo_seguridad: string;
                    estado: string;
                }>;
            }>(CLIENT_ENDPOINTS.getPaymentMethods);

            const raw = (response.data as any)?.metodos_pago ?? [];

            const mapped: ClientMethodPayment[] = raw.map((method: any) => ({
                tipo: method.tipo,
                numero: method.numero,
                ultimos_digitos: method.ultimos_digitos,
                fecha_vencimiento: new Date(method.fecha_vencimiento),
                codigo_seguridad: method.codigo_seguridad,
                estado: method.estado,
            }));

            return mapped;
        } catch (error) {
            const axiosErr = error as AxiosError<any>;
            const statusCode = axiosErr.response?.status;
            const backendCode = (axiosErr.response?.data as any)?.code;
            const backendMessage = (axiosErr.response?.data as any)?.message;

            // Caso: el usuario no tiene métodos de pago aún
            if (statusCode === 404 && backendCode === 404 && backendMessage === "Metodos de pago no encontrados") {
                return [];
            }

            throw error;
        }
    },
})
