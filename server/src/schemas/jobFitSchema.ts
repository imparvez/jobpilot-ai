import { z } from "zod";

export const jobFitSchema = z.object({
    matchingSkills: z.array(z.string()),
    strengths: z.array(z.string()),
    gaps: z.array(z.string()),
    cvSuggestions: z.array(z.string())
});

export type JobFit = z.infer<typeof jobFitSchema>;