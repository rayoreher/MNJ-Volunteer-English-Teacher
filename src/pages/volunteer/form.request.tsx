import { supabaseFunctionsUrl } from "@/lib/variables";
import { FormType } from "./form.schema";
import { useAxios } from "@/hooks/axios";

export function useFormRequest(){
  return useAxios<FormType, boolean>({
    url: supabaseFunctionsUrl + "/volunteer/form",
    method: "POST",
  })
}