import z from "https://deno.land/x/zod@v3.23.8/index.ts";

const today = new Date();
today.setHours(0, 0, 0, 0);

export const validationSchema = z.object({
    fullname: z.string().min(3, "Full name must be at least 3 characters long"),
    title: z.string().optional(),
    comment: z.string().min(3, "Full name must be at least 3 characters long"),
    token: z.string().min(5, "Token must be at least 5 characters long")
});