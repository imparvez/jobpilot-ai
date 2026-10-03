import type { Request, Response } from "express";
import mongoose from "mongoose";

import { Job } from '../models/Job.js';

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
                message: "Failed to retrieve jobs"
            });
        }
    },
    createJob: async (req: Request, res: Response) => {
        try {
            const {
                company,
                role,
                status
            } = req.body
            if(!company || !role || !status) {
                res
                    .status(400) // Bad Request
                    .json({ // Returning with Job is empty message
                        message: 'Job is empty'
                    });
                return;
            };
    
            const newJob = await Job.create({
                company,
                role,
                status
            });
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
                    message: "Invalid job ID"
                });
                return;
            }
            const job = await Job.findById(jobId);
            if(!job) {
                res
                    .status(404) // Job not found
                    .json({
                        message: 'No jobs found with given ID'
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
                    message: 'Failed to retrieve the Job'
                })
        }
    },
    updateJob: async (req: Request, res: Response) => {
        try {
            const jobId = req.params.id;
            const {
                company,
                role,
                status
            } = req.body
    
            if(!company && !role && !status) {
                res
                    .status(400) // Bad Request
                    .json({ // Returning with Job is empty message
                        message: 'Job is empty'
                    });
                return;
            };
            // const 
            if(!mongoose.Types.ObjectId.isValid(jobId)) {
                res.status(400).json({
                    message: "Invalid job ID"
                });
                return;
            }
    
            const updatedJob = await Job.findByIdAndUpdate(jobId, req.body, { new: true });
    
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
                    message: "Invalid job ID"
                });
                return;
            }
    
            const deletedJob = await Job.findByIdAndDelete(jobId);
            if(!deletedJob) {
                res
                    .status(404) // Job not found
                    .json({
                        message: 'No jobs found with given ID'
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
    }
}
