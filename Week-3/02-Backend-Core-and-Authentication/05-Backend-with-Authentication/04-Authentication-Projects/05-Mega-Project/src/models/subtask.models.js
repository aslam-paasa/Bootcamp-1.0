/**
 * 5. Designing Database Schema:
 * a. Import mongoose
 * b. Define the schema
 * c. Create the model
 * d. Export the model
 */

import mongoose, { Schema } from "mongoose";

const subtaskSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        task: {
            type: Schema.Types.ObjectId,
            ref: "Task",
            required: true,
        },
        isCompleted: {
            type: Boolean,
            default: false,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        }
    },
    { 
        timestamps: true 
    }
);

export const Subtask = mongoose.model("Subtask", subtaskSchema);
