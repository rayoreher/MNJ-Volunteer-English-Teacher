import { Database } from "@/types/database.types";
import { createClient } from "@supabase/supabase-js";
import { variables } from "./variables";

const { supabaseUrl, supabaseAnonKey } = variables;
console.log(variables);

export const supabase = createClient<Database>(supabaseUrl!, supabaseAnonKey!);
