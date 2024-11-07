import { z } from "https://deno.land/x/zod/mod.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Content-Type": "application/json",
  'Access-Control-Allow-Origin': '*',
   "Access-Control-Allow-Headers": "Content-Type, Authorization",
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

const today = new Date();
today.setHours(0, 0, 0, 0);

const validationSchema = z.object({
  fullname: z.string().min(3, "Full name must be at least 3 characters long"),
  email: z.string().email("Invalid email format"),
  age: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 17, {
    message: "Age must be 17 or older",
  }),
  nationality: z.string().min(
    3,
    "Nationality must be at least 3 characters long",
  ),
  token: z.string().min(5, "Token must be at least 5 characters long"),
  start_date: z
    .string()
    .transform((dateStr) => new Date(dateStr))
    .refine(
      (date) => date >= today,
      "Start date must be today or later",
    ),
  end_date: z
    .string()
    .transform((dateStr) => new Date(dateStr)),
  medical_problems: z.string().optional(),
  allergies: z.string().optional()
}).superRefine((data, context) => {
  if (data.end_date <= data.start_date) {
    context.addIssue({
      code: "custom",
      path: ["end_date"],
      message: "End date must be at least one day after start date",
    });
  }
});

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  const values = await req.json();
  const payload = validationSchema.safeParse(values);    
  if (!payload.success) {
    return new Response(
      JSON.stringify(new Error(JSON.stringify(payload.error.issues))),
      { headers: corsHeaders, status: 400 },
    );
  }

  const captchaResult = await validateHCaptcha(payload.data.token);
  if (!captchaResult) {
    return new Response(
      JSON.stringify(new Error("Captcha validation failed")),
      { headers: corsHeaders, status: 400 },
    );
  }
  
  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "");

  const { token, ...volunteer } = payload.data;

  const { error } = await supabaseClient.from("volunteers").insert(volunteer);  
  if (error) {
    return new Response(
      JSON.stringify(new Error(error.message)),
      { headers: corsHeaders, status: 400 },
    );
  }
  
  return new Response(
    null,
    { headers: corsHeaders, status: 200 },
  );
});

async function validateHCaptcha(token: string): Promise<boolean> {
  const SECRET_KEY = Deno.env.get("HCAPTCHA_SECRET")!;  
  const response = await fetch("https://hcaptcha.com/siteverify", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      secret: SECRET_KEY,
      response: token,
    }),
  });
  const data = await response.json();
  return data.success;
}