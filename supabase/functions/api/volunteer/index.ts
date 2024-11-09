import { Hono } from 'jsr:@hono/hono';
import { cors } from "jsr:@hono/hono/cors";
import { form } from './form/index.ts';

const volunteer = new Hono().basePath("/volunteer");

volunteer.use(cors({
    origin: ["http://localhost:3000", "http://mnj-volunteer-project.rayoreher.com/", "https://mnj-volunteer-project.rayoreher.com/"],
}));

volunteer.route("", form);

export default volunteer;