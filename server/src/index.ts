import express from 'express';
import mongoose from "mongoose";
import "dotenv/config";
import cors from 'cors';

import { router } from './routes/jobRoutes.js'

const app = express(); // Creates the express application.
app.use(cors());
app.use(express.json()); // tells Express to parse incoming JSON bodies.

const PORT = 3000;

app.get("/", (req, res) => {
    res.json({
        message: "JobPilot AI API is running"
    });
});

app.use("/jobs", router);

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