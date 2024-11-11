import { Hono } from "jsr:@hono/hono";
import { BadRequest } from "../../exceptions/bad-request.ts";
import { validationSchema } from "./validator.ts";
import { createClient } from "npm:@supabase/supabase-js@2";
import { validateHCaptcha } from "../../../lib/validate-captcha.ts";

export const form = new Hono().post("form", async (c) => {
    const values = await c.req.json();
    const payload = validationSchema.safeParse(values);  
    if (!payload.success) {
        throw new BadRequest(payload.error.message);
    }

    const { token, ...review } = payload.data;

    const captchaResult = await validateHCaptcha(token);
    if (!captchaResult) {
        throw new BadRequest("Captcha validation failed");
    }
    
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "");
  
    const { error } = await supabaseClient.from("volunteers").insert(review);  
    if (error) {
        throw new BadRequest(error.message);
    }
    
    return new Response(
      null,
      { status: 200 },
    );
});

// async function validateHCaptcha(token: string): Promise<boolean> {
//   const SECRET_KEY = Deno.env.get("HCAPTCHA_SECRET")!;  
//   const response = await fetch("https://hcaptcha.com/siteverify", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//     body: new URLSearchParams({
//       secret: SECRET_KEY,
//       response: token,
//     }),
//   });
//   const data = await response.json();
//   return data.success;
// }