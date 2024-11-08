import z from "https://deno.land/x/zod@v3.23.8/index.ts";

const today = new Date();
today.setHours(0, 0, 0, 0);

export const validationSchema = z.object({
    fullname: z.string().min(3, "Full name must be at least 3 characters long"),
    email: z.string().email("Invalid email format"),
    age: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 17, {
        message: "Age must be 17 or older",
    }),
    nationality: z.string().min(
        3,
        "Nationality must be at least 3 characters long",
    ),
    token: z.string().min(5, "Token must be at least 5 characters long"),
    start_date: z
        .string()
        .transform((dateStr) => new Date(dateStr))
        .refine(
            (date) => date >= today,
            "Start date must be today or later",
        ),
    end_date: z
        .string()
        .transform((dateStr) => new Date(dateStr)),
    medical_problems: z.string().optional(),
    allergies: z.string().optional(),
}).superRefine((data, context) => {
    if (data.end_date <= data.start_date) {
        context.addIssue({
            code: "custom",
            path: ["end_date"],
            message: "End date must be at least one day after start date",
        });
    }
});