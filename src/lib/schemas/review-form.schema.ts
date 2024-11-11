import { z } from "zod";

const today = new Date();
today.setHours(0, 0, 0, 0);

export const reviewFormSchema = z.object({
    fullname: z.string().min(3, "Full name must be at least 3 characters long"),
    comment: z.string().min(
        3,
        "Review must be at least 3 characters long",
    ),
    token: z.string().min(5, "Token must be at least 5 characters long"),
});

export type ReviewFormType = z.infer<typeof reviewFormSchema>;
