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

export const userSchema = z.object({
  student_id: z
    .string()
    .min(1, { message: "Student ID is required" })
    .max(50, { message: "Student ID must be at most 50 characters long" }),

  first_name: z
    .string()
    .min(1, { message: "First name is required" })
    .max(100, { message: "First name must be at most 100 characters long" }),

  middle_name: z
    .string()
    .max(100, { message: "Middle name must be at most 100 characters long" })
    .optional()
    .or(z.literal("")), // Allows empty string

  last_name: z
    .string()
    .min(1, { message: "Last name is required" })
    .max(100, { message: "Last name must be at most 100 characters long" }),

  suffix: z
    .string()
    .max(10, { message: "Suffix must be at most 10 characters long" })
    .optional()
    .or(z.literal("")), // Allows empty string

  year: z
    .enum(["1", "2", "3", "4"], { message: "Year must be 1, 2, 3, or 4" }),

  section: z
    .string()
    .min(1, { message: "Section is required" })
    .max(10, { message: "Section must be at most 10 characters long" }),
});
