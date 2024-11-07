import { z } from "zod";

export function validationSchema() {
    const today = new Date();
today.setHours(0, 0, 0, 0);
    return z.object({
        fullname: z.string().min(3, "Full name must be at least 3 characters long"),
        email: z.string().email("Invalid email format"),
        age: z.number().min(17, "Age must be at least 17"),
        nationality: z.string().min(
          3,
          "Nationality must be at least 3 characters long",
        ),
        token: z.string().min(5, "Token must be at least 5 characters long"),
        startDate: z
          .string()
          .transform((dateStr) => new Date(dateStr))
          .refine(
            (date) => date >= today,
            "Start date must be today or later",
          ),
        endDate: z
          .string()
          .transform((dateStr) => new Date(dateStr)),
        medicalProblems: z.string().optional(),
        foodAllergies: z.string().optional(),
        status: z.string().optional(),
      }).superRefine((data, context) => {
        if (data.endDate <= data.startDate) {
          context.addIssue({
            code: "custom",
            path: ["end_date"],
            message: "End date must be at least one day after start date",
          });
        }
      });
}



//export type VolunteerCreate = z.infer<typeof VolunteerCreateSchema>;