import { Hono } from 'jsr:@hono/hono';
import { cors } from "jsr:@hono/hono/cors";
import { form } from './form/index.ts';

const volunteer = new Hono().basePath("/volunteer");

volunteer.route("", form);

export default volunteer;