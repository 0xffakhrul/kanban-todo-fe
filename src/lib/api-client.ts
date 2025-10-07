import axios, { AxiosError } from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export class ApiError extends Error {
  status: number;
  details?: any;

  constructor(message: string, status: number, details?: any) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<any>) => {
    if (error.response) {
      throw new ApiError(
        error.response.data?.error || 'An error occurred',
        error.response.status,
        error.response.data?.details
      );
    }
    throw new ApiError('Network error', 0);
  }
);

export async function apiRequest<T>(
  endpoint: string,
  options: {
    method?: string;
    body?: any;
    headers?: Record<string, string>;
  } = {}
): Promise<T> {
  const { method = "GET", body, headers } = options;

  const response = await apiClient.request<T>({
    url: endpoint,
    method,
    data: body,
    headers,
  });

  return response.data;
}
