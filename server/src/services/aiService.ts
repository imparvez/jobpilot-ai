import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { jobAnalysisSchema } from "../schemas/jobAnalysisSchema.js";

export const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export const analyseDescription = async (
    company: string,
    role: string,
    description: string
) => {
    const response = await openai.responses.parse({
        model: "gpt-5-mini",
        instructions: `
            You are a job analysis assistant.
            Analyse only the supplied job description.
            Do not invent information that is not provided.
            If responsibilities are not stated, return an empty array.
            If seniority is unclear, say "Unclear".
            Return a maximum of 5 questions to clarify.
            Prioritise questions that affect whether the candidate
            should apply for the job.
        `,
        input: `
            Company: ${company}
            Role: ${role}

            Job Description:
            ${description}
        `,
        text: {
            format: zodTextFormat(jobAnalysisSchema, "job_analysis")
        }
    });

    return response.output_parsed;
};