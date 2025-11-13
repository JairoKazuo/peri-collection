import { api } from "@/lib/api/client";
import { AUTH_ENDPOINTS } from "./endpoints";

export async function register<TRequest extends Record<string, any>, TResponse = any>(payload: TRequest): Promise<TResponse> {
  const { data } = await api.post<TResponse>(AUTH_ENDPOINTS.register, payload);
  return data;
}
