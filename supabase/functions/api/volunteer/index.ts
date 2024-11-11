import { Hono } from 'jsr:@hono/hono';
import { form } from './form/index.ts';

const volunteer = new Hono().basePath("/volunteer");

volunteer.route("", form);

export default volunteer;