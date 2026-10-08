import express from 'express';
import { JobController } from '../controllers/jobController.js';

export const router = express.Router();

router.get("/", JobController.getJobs);
router.post("/", JobController.createJob);
router.get("/:id", JobController.getJob);
router.patch("/:id", JobController.updateJob);
router.delete("/:id", JobController.deleteJob);
router.post("/:id/analyse", JobController.analyseJob);