"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useMemo } from "react";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

import { LoginSchema } from "../types/auth.schema";
import { makeAuthService } from "../services/auth.service";
import { useApiClient } from "@/lib/api/useApiClient";

export function useLoginForm() {
  const router = useRouter();
  const api = useApiClient();
  const auth = useMemo(() => makeAuthService(api), [api]);

  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data: LoginSchema) => {
    setIsLoading(true);
    setLoginError(null);

    try {
      console.log("Login payload enviado al backend:", data);
      const response = await auth.loginUser(data);
      console.log("Response: ", response);

      // Si el backend responde con éxito, redirigir al dashboard del cliente
      if ((response as any)?.status === "success") {
        router.push("/customer/account");
      }
    } catch (error) {
      console.error("Error capturado durante el inicio de sesion: ", error);

      if (error instanceof AxiosError) {
        const message =
          (error.response as any)?.data?.message || "Error al iniciar sesion";
        setLoginError(message);
      } else {
        setLoginError("Error al iniciar sesion");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isLoading,
    loginError,
  };
}