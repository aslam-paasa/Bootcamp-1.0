/**
 * 5. Designing Database Schema:
 * a. Import mongoose
 * b. Define the schema
 * c. Create the model
 * d. Export the model
 */

import mongoose, { Schema } from "mongoose";

const projectNoteSchema = new Schema(
    {
        project: {
            type: Schema.Types.ObjectId,
            ref: "Project",
            required: true,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        content: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
);

export const ProjectNote = mongoose.model("ProjectNote", projectNoteSchema);
