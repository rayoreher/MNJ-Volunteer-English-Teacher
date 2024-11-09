import { z } from "zod";

const today = new Date();
today.setHours(0, 0, 0, 0);

export const formSchema = z.object({
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
        .date()
        .refine(
            (date) => date >= today,
            "Start date must be today or later",
        ),
    end_date: z
        .date(),
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


export type FormType = z.infer<typeof formSchema>;

const gian: FormType = {
    fullname: "Gian",
    email: "gian@me.com",
    age: "17",
    nationality: "Italian",
    token: "12345",
    start_date: new Date("2022-01-01"),
    end_date: new Date("2022-01-02"),
    medical_problems: "None",    
    allergies: "None",
};