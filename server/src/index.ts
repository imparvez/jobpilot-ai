import express from 'express';
import mongoose from "mongoose";
import "dotenv/config";
import cors from 'cors';

import { Job } from './models/Job';

const app = express(); // Creates the express application.
app.use(cors());
app.use(express.json()); // tells Express to parse incoming JSON bodies.

const PORT = 3000;

app.get("/", (req, res) => {
    res.json({
        message: 'JobPilot AI API is running'
    });
});

app.get("/jobs", async (req, res) => {
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
});



app.post("/jobs", async (req, res) => {
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
});

app.get("/jobs/:id", async (req, res) => {
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
});

app.patch("/jobs/:id", async (req, res) => {
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
});

app.delete("/jobs/:id", async (req, res) => {
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
});

async function startServer() {
    try {
        await mongoose.connect(process.env.MONGODB_URI!);

        console.log("✅ Connected to MongoDB");

        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("❌ Failed to connect to MongoDB");
        console.error(error);
    }
}

startServer();