import { Hono } from 'jsr:@hono/hono';
import { form } from './form/index.ts';

const reviews = new Hono().basePath("/reviews");

reviews.route("", form);

export default reviews;