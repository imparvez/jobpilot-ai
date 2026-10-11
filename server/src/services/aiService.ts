import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { jobAnalysisSchema } from "../schemas/jobAnalysisSchema.js";
import { jobFitSchema } from "../schemas/jobFitSchema.js";

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

export const matchCandidateToJob = async (
    jobDescription: string,
    candidateProfile: string
) => {
    const response = await openai.responses.parse({
        model: "gpt-5-mini",
        instructions: `
            You are a job matching assistant.

            Compare the candidate profile against the job description.

            Rules:
            - Only use information explicitly provided in the inputs.
            - Never invent candidate skills or experience.
            - matchingSkills must contain only technical skills
            explicitly mentioned in BOTH the job description
            and candidate profile.
            - Do not include years of experience or project descriptions
            in matchingSkills.
            - Do not infer full-stack proficiency from Node.js alone.
            - strengths must be supported by candidate evidence.
            - gaps must identify missing requirements or missing evidence.
            - Do not treat unspecified job requirements as candidate gaps.
            - CV suggestions must be truthful and must not assume
            the candidate has used a tool unless stated.
            - Keep suggestions concise and actionable.
        `,
        input: `
            JOB DESCRIPTION:
            ${jobDescription}

            CANDIDATE PROFILE:
            ${candidateProfile}
        `,
        text: {
            format: zodTextFormat(jobFitSchema, "job_fit")
        }
    });

    if (!response.output_parsed) {
        throw new Error("AI did not return a valid job fit analysis");
    }

    return response.output_parsed;
};