import { supabaseFunctionsUrl } from "@/lib/variables";
import { FormType } from "../lib/schemas/form.schema";
import { useAxios } from "@/hooks/axios";

export function useFormRequest(){
  return useAxios<FormType, boolean>({
    url: supabaseFunctionsUrl + "/volunteer/form",
    method: "POST",
  })
}