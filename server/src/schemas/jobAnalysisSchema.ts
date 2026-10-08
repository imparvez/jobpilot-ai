// import { z } from 'zod';

// export const analyseJobSchema = z.object({
//     strengths: z.array(z.string()),
//     gaps: z.array(z.string()),
//     matchingSkills: z.array(z.string()),
//     cvSuggestions: z.array(z.string())
// });

// export type JobAnalysis = z.infer<typeof analyseJobSchema>;
import { z } from "zod";

export const jobAnalysisSchema = z.object({
    requiredSkills: z.array(z.string()),
    responsibilities: z.array(z.string()),
    seniority: z.string(),
    questionsToClarify: z.array(z.string()).max(5)
});

export type JobAnalysis = z.infer<typeof jobAnalysisSchema>;