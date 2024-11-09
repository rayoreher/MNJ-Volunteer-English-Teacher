import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { Hono } from 'jsr:@hono/hono';
import volunteer from "./volunteer/index.ts";
import { cors } from "jsr:@hono/hono/cors";

const app = new Hono().basePath("api");

app.use(cors({
  origin: "*",
}));

app.route("", volunteer);

Deno.serve(app.fetch);
