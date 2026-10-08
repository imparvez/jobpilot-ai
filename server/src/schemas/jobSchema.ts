import { z } from "zod";

const jobSchemaStatus = z.enum([
    'NEW',
    'APPLIED',
    'INTERVIEW',
    'REJECTED',
    'OFFER'
])

export const createJobSchema = z.object({
    company: z.string().trim().min(1),
    role: z.string().trim().min(1),
    status: jobSchemaStatus,
    description: z.string().trim().min(1)
});

export const updateJobSchema = z.object({
    company: z.string().trim().min(1).optional(),
    role: z.string().trim().min(1).optional(),
    status: jobSchemaStatus.optional(),
    description: z.string().trim().min(1).optional()
}).refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required"
});

export type CreateJobInput = z.infer<typeof createJobSchema>;
export type UpdateJobInput = z.infer<typeof updateJobSchema>;