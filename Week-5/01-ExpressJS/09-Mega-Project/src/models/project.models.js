/**
 * 5. Designing Database Schema:
 * a. Import mongoose
 * b. Define the schema
 * c. Create the model
 * d. Export the model
 */

import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        description: {
            type: String,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        }
    }, 
    { timestamps: true });

export const Project = mongoose.model("Project", projectSchema);
