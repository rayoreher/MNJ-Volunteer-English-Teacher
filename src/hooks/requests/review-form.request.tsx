import { supabaseFunctionsUrl } from "@/lib/variables";
import { useAxios } from "@/hooks/axios";
import { ReviewFormType } from "@/lib/schemas/review-form.schema";

export function useReviewFormRequest(){
  return useAxios<ReviewFormType, boolean>({
    url: supabaseFunctionsUrl + "/reviews/form",
    method: "POST",
  })
}