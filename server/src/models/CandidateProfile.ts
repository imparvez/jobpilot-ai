import mongoose from "mongoose";

const candidateProfileSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        yearsOfExperience: {
            type: Number,
            required: true,
        },
        skills: {
            type: [String],
            required: true
        },
        summary: {
            type: String,
            required: true
        }
    }, {
        timestamps: true
    }
)

export const CandidateProfile = mongoose.model("CandidateProfile", candidateProfileSchema);