import express from "express";
import { CandidateProfileController } from "../controllers/candidateProfileController.js";

export const candidateProfileRouter = express.Router();

candidateProfileRouter.post( "/", CandidateProfileController.createProfile);
candidateProfileRouter.get( "/:id", CandidateProfileController.getProfile);