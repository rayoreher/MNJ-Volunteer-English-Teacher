import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { Hono } from 'jsr:@hono/hono';
import volunteer from "./volunteer/index.ts";

const app = new Hono().basePath("api");

app.route("", volunteer);
app.post('/', async (c) => {
  const { name } = await c.req.json();
  return new Response(`Hello ${name}!`)

});

app.get('/', (c) => {
  return new Response('Hello World!')
});

Deno.serve(app.fetch);
