import { Database } from "@/types/database.types";
import { createClient } from "@supabase/supabase-js";
import { supabaseAnonKey, supabaseUrl } from "./variables";

export const supabase = createClient<Database>(supabaseUrl!, supabaseAnonKey!);
