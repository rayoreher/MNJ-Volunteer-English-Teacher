import axios, { AxiosRequestConfig } from "axios";
import { useState } from "react";
interface HtpHook<TRequest, TResponse> {
    isLoading: boolean;
    sendRequest: (body: TRequest) => Promise<HookResult<TResponse>>;
  }

  interface HookResult<TResponse> {
    data: TResponse | null;
    error: HookError | null;
    success: boolean;
  }
  
  interface HookError {
    message: string;
    status: number;
  }

  export function usePost(url: string){
    return useAxios({ method: "POST" });
  }

  export function useAxios<TRequest, TResponse>(config: AxiosRequestConfig): HtpHook<TRequest, TResponse> {
    const [isLoading, setIsLoading] = useState(false);
  
    const sendRequest = async (body: TRequest): Promise<HookResult<TResponse>> => {
      setIsLoading(true);
      try {
        const response = await axios<TResponse>({
          ...config,
          data: body
        });
        return {
          data: response.data,
          error: null,
          success: true
        };
      } catch (err) {
        return {
          data: null,
          error: {
            message: (err as HookError).message,
            status: (err as HookError).status
          },
          success: false
        }
      } finally {
        setIsLoading(false);
      }
    };
  
    return { isLoading, sendRequest };
  }
  