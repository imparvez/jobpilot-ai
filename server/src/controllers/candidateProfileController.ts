import type { Request, Response } from "express";
import { candidateProfileSchema } from "../schemas/candidateProfileSchema.js";
import { CandidateProfile } from '../models/CandidateProfile.js';
import mongoose from "mongoose";

const INVALID_CANDIDATE_DATA = 'Invalid Candidate Data';
const INVALID_CANDIDATE_ID = 'Invalid Candidate ID';
const NO_CANDIDATE_FOUND_WITH_GIVEN_ID = 'No Candidate found with given ID';
const FAILED_TO_RETRIEVE_THE_CANDIDATE = 'Failed to retrieve the candidate';

export const CandidateProfileController = {
    createProfile: async (req: Request, res: Response) => {
        try {
            const result = candidateProfileSchema.safeParse(req.body);

            if(!result.success) {
                console.error(result.error);
                res
                    .status(400) // Bad Request
                    .json({ // Returning with invalid candidate data message 
                        message: INVALID_CANDIDATE_DATA,
                        errors: result.error.issues
                    })
                return;
            }

            const candidateProfile = await CandidateProfile.create(result.data);
            res.status(201).json({
                message: 'Candidate Profile Created',
                candidate: candidateProfile
            });
        } catch (error) {
            console.error(error);
    
            res.status(500).json({
                message: "Failed to create candidate profile"
            });
        }
    },
    getProfile: async (req: Request, res: Response) => {
        try {
            const candidateProfileId = req.params.id;
            if(!mongoose.Types.ObjectId.isValid(candidateProfileId)) {
                res.status(400).json({
                    message: INVALID_CANDIDATE_ID
                });
                return;
            }
            const candidateProfile = await CandidateProfile.findById(candidateProfileId);
            if (!candidateProfile) {
                res
                    .status(404) // Candidate Profile Not Found
                    .json({
                        message: NO_CANDIDATE_FOUND_WITH_GIVEN_ID
                    })
                return;
            }
            res
                .status(200)
                .json({
                    message: 'Candidate Found',
                    candidateProfile
                })
        } catch (error) {
            console.error(error);
            res
                .status(500)
                .json({
                    message: FAILED_TO_RETRIEVE_THE_CANDIDATE
                })
        }
    }
}