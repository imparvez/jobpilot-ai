import type { Request, Response } from "express";
import mongoose from "mongoose";

import { Job } from '../models/Job.js';
import { createJobSchema, updateJobSchema } from '../schemas/jobSchema.js'
import { analyseDescription } from "../services/aiService.js";

const INVALID_JOB_DATA: string = 'Invalid Job Data';
const INVALID_JOB_ID: string = 'Invalid job ID';
const NO_JOBS_FOUND_WITH_GIVEN_ID: string = 'No jobs found with given ID';
const FAILED_TO_RETRIEVE_THE_JOBS: string = 'Failed to retrieve the Job';

export const JobController = {
    getJobs: async (req: Request, res: Response) => {
        try {
            const jobs = await Job.find();
            res
                .status(200)
                .json({
                    jobs
                });
        } catch (error) {
            console.error(error);
    
            res.status(500).json({
                message: FAILED_TO_RETRIEVE_THE_JOBS
            });
        }
    },
    createJob: async (req: Request, res: Response) => {
        try {
            const result = createJobSchema.safeParse(req.body);
            if(!result.success) {
                console.log(result.error);
                res
                    .status(400) // Bad Request
                    .json({ // Returning with Job is empty message
                        message: INVALID_JOB_DATA,
                        errors: result.error.issues
                    });
                return;
            };
    
            const newJob = await Job.create(result.data);
            res.status(201).json({
                message: 'Job created',
                job: newJob
            });
        } catch (error) {
            console.error(error);
    
            res.status(500).json({
                message: "Failed to create jobs"
            });
        };
    },
    getJob: async (req: Request, res: Response) => {
        try {
            const jobId = req.params.id;
    
            if(!mongoose.Types.ObjectId.isValid(jobId)) {
                res.status(400).json({
                    message: INVALID_JOB_ID
                });
                return;
            }
            const job = await Job.findById(jobId);
            if(!job) {
                res
                    .status(404) // Job not found
                    .json({
                        message: NO_JOBS_FOUND_WITH_GIVEN_ID
                    })
                return;
            }
            res
                .status(200)
                .json({
                    message: 'Job Found',
                    job
                })
        } catch (error) {
            res
                .status(500)
                .json({
                    message: FAILED_TO_RETRIEVE_THE_JOBS
                })
        }
    },
    updateJob: async (req: Request, res: Response) => {
        try {
            const jobId = req.params.id;
            const result = updateJobSchema.safeParse(req.body);
    
            if(!result.success) {
                console.log(result.error);
                res
                    .status(400) // Bad Request
                    .json({ // Returning with Job is empty message
                        message: INVALID_JOB_DATA,
                        errors: result.error.issues
                    });
                return;
            };
            // const 
            if(!mongoose.Types.ObjectId.isValid(jobId)) {
                res.status(400).json({
                    message: INVALID_JOB_ID
                });
                return;
            }
    
            const updatedJob = await Job.findByIdAndUpdate(
                jobId, 
                result.data, 
                { new: true, runValidators: true }
            );
    
            if (!updatedJob) {
                res.status(404).json({
                    message: "Job not found"
                });
                return;
            }
    
            res.status(200).json({
                message: "Job updated",
                job: updatedJob
            });
        } catch (error) {
            console.error(error);
            res
                .status(500)
                .json({
                    message: 'Failed to update the Job'
                })
        }
    },
    deleteJob: async (req: Request, res: Response) => {
        try {
            const jobId = req.params.id;
    
            if(!mongoose.Types.ObjectId.isValid(jobId)) {
                res.status(400).json({
                    message: INVALID_JOB_ID
                });
                return;
            }
    
            const deletedJob = await Job.findByIdAndDelete(jobId);
            if(!deletedJob) {
                res
                    .status(404) // Job not found
                    .json({
                        message: NO_JOBS_FOUND_WITH_GIVEN_ID
                    })
                return;
            }
            res
                .status(200)
                .json({
                    message: 'Job Deleted',
                    deletedJob
                })
    
        } catch (err) {
            console.error(err);
            res
                .status(500)
                .json({
                    message: 'Failed to delete the Job'
                })
        }
    },
    analyseJob: async (req: Request, res: Response) => {
        try {
            // Fetch job id from params
            const jobId = req.params.id;

            // Validate the job ID
            if(!mongoose.Types.ObjectId.isValid(jobId)) {
                res.status(400).json({
                    message: INVALID_JOB_ID
                });
                return;
            }
            // Find the job
            const job = await Job.findById(jobId);
            // If job not found show 404 job not found error.
            if(!job) {
                res
                    .status(404) // Job not found
                    .json({
                        message: NO_JOBS_FOUND_WITH_GIVEN_ID
                    })
                return;
            }
            
            const analysis = await analyseDescription(
                job.company,
                job.role,
                job.description
            );

            if(!analysis) {
                res.status(502).json({
                    message: "AI did not return a valid analysis"
                });
                return;
            }

            res
                .status(200)
                .json({
                    message: 'Job analysed successfully',
                    analysis
                })
        } catch (err) {
            console.error(err);
            res
                .status(500)
                .json({
                    message: 'Failed to analyse the Job'
                })
        }
    }
}
