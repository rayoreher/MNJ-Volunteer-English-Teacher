import { supabaseFunctionsUrl } from "@/lib/variables";
import { VolunteerFormType } from "../lib/schemas/volunteer-form.schema";
import { useAxios } from "@/hooks/axios";

export function useVolunteerFormRequest(){
  return useAxios<VolunteerFormType, boolean>({
    url: supabaseFunctionsUrl + "/volunteer/form",
    method: "POST",
  })
}