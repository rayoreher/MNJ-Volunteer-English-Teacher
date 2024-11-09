import { HTTPException } from 'jsr:@hono/hono/http-exception';

export class BadRequest extends HTTPException {
    statusCode = 400;


    constructor(message: BodyInit) {
        const errorResponse = new Response(message, {
            status: 400,
          })
        super(400, { res: errorResponse });
        this.name = "BadRequest";
    }
}