import { z } from "zod";

export const candidateProfileSchema = z.object({
    name: z.string().trim().min(1),
    yearsOfExperience: z.number().min(0),
    skills: z.array(z.string().trim().min(1)).min(1),
    summary: z.string().trim().min(1)
});

export type CandidateProfileInput = z.infer<typeof candidateProfileSchema>;