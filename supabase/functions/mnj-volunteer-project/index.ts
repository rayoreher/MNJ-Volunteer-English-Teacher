// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"

import { Hono } from 'jsr:@hono/hono';

const app = new Hono().basePath("/mnj-volunteer-project");
app.post('/', async (c) => {
  const { name } = await c.req.json();
  return new Response(`Hello ${name}!`)
});

app.get('/', (c) => {
  return new Response('Hello World!')
});

Deno.serve(app.fetch);
