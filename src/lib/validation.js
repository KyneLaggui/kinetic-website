import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email("Invalid email address").max(255)
})