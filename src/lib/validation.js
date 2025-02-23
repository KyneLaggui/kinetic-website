import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email("Invalid email address").max(255)
})

export const quizSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }).max(255),
    assessment: z.enum(["Assessment 1", "Assessment 2", "Assessment 3"], {
        message: "Assessment must be one of the allowed values.",
    }),
    duration: z.coerce.number().min(1, { message: "Duration must be at least a minute." }).max(999),
})