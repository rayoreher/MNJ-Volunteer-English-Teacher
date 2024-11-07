import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useState } from "react";
import { supabaseFunctionsUrl } from "@/lib/variables";

interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  isLoading: boolean;
  sendRequest: (body: T) => Promise<void>;
}

export function useFormRequest<T>(): ApiResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = async (body: T) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(supabaseFunctionsUrl + "/volunteer/for", body, {
        headers: { "Content-Type": "application/json" },
      });

      setData(response.data);
    } catch (err) {
      console.log('error', (err as Error));
      setError((err as Error).message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, isLoading, sendRequest };
}

interface HookResponse<TRequest, TResult> {
  data: TResult | null;
  error: string | null;
  isLoading: boolean;
  sendRequest: (body: TRequest) => Promise<void>;
}

export function useAxios<TRequest, TResult>(config: AxiosRequestConfig): HookResponse<TRequest, TResult> {
  const [data, setData] = useState<TResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = async (body: TRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios<TResult>({
        ...config,
        data: body
      });

      setData(response.data);
    } catch (err) {
      console.log("error", err);
      setError((err as Error).message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, isLoading, sendRequest };
}