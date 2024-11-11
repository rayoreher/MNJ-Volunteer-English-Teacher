// import { supabase } from "@/lib/supabase-client";
// import axios, { AxiosRequestConfig } from "axios";
// import { useState } from "react";
// interface HtpHook<TRequest, TResponse> {
//   isLoading: boolean;
//   sendRequest: (body: TRequest) => Promise<HookResult<TResponse>>;
// }

// interface HookResult<TResponse> {
//   data: TResponse | null;
//   error: HookError | null;
//   success: boolean;
// }

// interface HookError {
//   message: string;
//   status: number;
// }

// export function usePost(url: string) {
//   return useAxios({ method: "POST" });
// }

// export function useAxios<TRequest, TResponse>(
//   config: AxiosRequestConfig,
// ): HtpHook<TRequest, TResponse> {
//   const [isLoading, setIsLoading] = useState(false);

//   const sendRequest = async (
//     body: TRequest,
//   ): Promise<HookResult<TResponse>> => {
//     setIsLoading(true);
//     const { data, error } = await supabase
//       .from("reviews")
//       .select("*")
//       .order("created_at", { ascending: false });
//     const p: PostgrestFilterBuilder= supabase
//       .from("reviews")
//       .select("*")
//       .order("created_at", { ascending: false });
//     return {
//       data: data,
//       error: null,
//       success: true,
//     };
//     setIsLoading(false);
//   };

//   return { isLoading, sendRequest };
// }
