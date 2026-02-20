/**
 * 5. Designing Database Schema:
 * a. Import mongoose
 * b. Define the schema
 * c. Create the model
 * d. Export the model
 */

import mongoose, { Schema } from "mongoose";
import { AvailableTaskStatuses, TaskStatusEnum } from "../config/constants.js";

const taskSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
        },
        project: {
            type: Schema.Types.ObjectId,
            ref: "Project",
            required: true,
        },
        assignedTo: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        assignedBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        status: {
            type: String,
            enum: AvailableTaskStatuses,
            default: TaskStatusEnum.TODO,
        },
        attachments: {
            type: [
                {
                    url: String,
                    mimetype: String,
                    size: Number
                }
            ],
            default: [],
        },
         
    },
    { timestamps: true }
);

export const Task = mongoose.model("Task", taskSchema);
