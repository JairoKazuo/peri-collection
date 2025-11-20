import { api } from "@/lib/api/client";
import { AUTH_ENDPOINTS } from "./endpoints";

import { AxiosInstance } from "axios";
import { LoginSchema } from "../types/auth.schema";

export async function register<TRequest extends Record<string, any>, TResponse = any>(payload: TRequest): Promise<TResponse> {
  const { data } = await api.post<TResponse>(AUTH_ENDPOINTS.register, payload);
  return data;
}

export const makeAuthService = (API_CLIENT: AxiosInstance) => ({
  async loginUser(payload: LoginSchema){
    const response = await API_CLIENT.post(AUTH_ENDPOINTS.login, payload)
    return response.data
  }
})