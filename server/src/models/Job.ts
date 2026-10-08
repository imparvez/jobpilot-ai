import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
    {
        company: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true,
            enum: [
                'NEW',
                'APPLIED',
                'INTERVIEW',
                'REJECTED',
                'OFFER'
            ]
        },
        description: {
            type: String,
            required: true
        }
    }, {
        timestamps: true
    }
);

export const Job = mongoose.model("Job", jobSchema);