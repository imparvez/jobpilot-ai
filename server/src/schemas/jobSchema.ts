import { z } from "zod";

export const createJobSchema = z.object({
    company: z.string().trim().min(1),
    role: z.string().trim().min(1),
    status: z.string().trim().min(1)
});

export const updateJobSchema = z.object({
    company: z.string().trim().min(1).optional(),
    role: z.string().trim().min(1).optional(),
    status: z.string().trim().min(1).optional()
}).refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required"
});