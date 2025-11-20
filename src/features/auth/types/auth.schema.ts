import { z } from "zod";

export const LoginSchema = z.object({
    email: z.string().email("El correo electrónico es requerido."),
    password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres."),
});

export type LoginSchema = z.infer<typeof LoginSchema>;