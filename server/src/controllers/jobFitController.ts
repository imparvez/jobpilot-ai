import type { Request, Response } from "express";
import mongoose from "mongoose";
import { CandidateProfile } from "../models/CandidateProfile.js";
import { Job } from "../models/Job.js";
import { matchCandidateToJob } from "../services/aiService.js";

const INVALID_JOB_ID: string = 'Invalid job ID';
const NO_JOBS_FOUND_WITH_GIVEN_ID: string = 'No jobs found with given ID';

export const JobFitController = {
    matchJob: async (req: Request, res: Response) => {
        try {
            // Fetch job id from params
            const jobId = req.params.jobId;
            const candidateId = req.params.candidateId;

            // Validate the job ID
            if(!mongoose.Types.ObjectId.isValid(jobId)) {
                res.status(400).json({
                    message: INVALID_JOB_ID
                });
                return;
            }

            // Validate the candidate ID
            if(!mongoose.Types.ObjectId.isValid(candidateId)) {
                res.status(400).json({
                    message: 'Invalid candidate ID'
                });
                return;
            }
            const [job, candidateProfile] = await Promise.all([
                Job.findById(jobId),
                CandidateProfile.findById(candidateId)
            ]);
            // If job not found show 404 job not found error.
            if(!job) {
                res
                    .status(404) // Job not found
                    .json({
                        message: NO_JOBS_FOUND_WITH_GIVEN_ID
                    })
                return;
            }
            if (!candidateProfile) {
                res
                    .status(404) // Candidate Profile Not Found
                    .json({
                        message: 'No candidate found with given ID'
                    })
                return;
            }

            const analysis = await matchCandidateToJob(
                job.description,
                JSON.stringify({
                    yearsOfExperience: candidateProfile.yearsOfExperience,
                    skills: candidateProfile.skills,
                    summary: candidateProfile.summary
                })
            );

            res.status(200).json({
                message: "Job fit analysis completed successfully",
                jobId,
                candidateId,
                analysis
            });
        } catch (error) {
            console.error(error);
            res
                .status(500)
                .json({
                    message: 'Failed to match the job with given candidate profile'
                })
        }
    }
}
