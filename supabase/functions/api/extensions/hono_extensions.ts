import { BlankEnv, BlankSchema, Schema } from 'jsr:@hono/hono/types';
import { Env, Hono } from 'jsr:@hono/hono';

declare module 'jsr:@hono/hono' {
  interface Hono {
    addRoute(group: Hono): void;
  }
}

Hono.prototype.addRoute = function(group: Hono) {
    this.route("", group);
  }