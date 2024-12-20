const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const hCaptchaSiteKey = process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY;
const supabaseFunctionsUrl = process.env.NEXT_PUBLIC_SUPABASE_URL + '/functions/v1/api';
export  { supabaseUrl, supabaseAnonKey, hCaptchaSiteKey, supabaseFunctionsUrl };