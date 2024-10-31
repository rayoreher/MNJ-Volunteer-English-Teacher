import { Database } from "@/types/database.types";
import { createClient } from "@supabase/supabase-js";
import { variables } from "./variables";

const { supabaseUrl, supabaseAnonKey } = variables;
console.log(process.env);

export const supabase = createClient<Database>(supabaseUrl!, supabaseAnonKey!);
