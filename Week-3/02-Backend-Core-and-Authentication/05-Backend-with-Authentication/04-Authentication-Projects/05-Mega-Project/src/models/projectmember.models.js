/**
 * 5. Designing Database Schema:
 * a. Import mongoose
 * b. Define the schema
 * c. Create the model
 * d. Export the model
 */

import mongoose, { Schema } from "mongoose";
import { AvailableUserRoles, UserRoles } from "../config/constants.js"

const projectMemberSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        project: {
            type: Schema.Types.ObjectId,
            ref: "Project",
            required: true,
        },
        role: {
            type: String,
            enum: AvailableUserRoles,
            default: UserRoles.MEMBER,
        }
    },
    { timestamps: true }
);

export const ProjectMember = mongoose.model("ProjectMember", projectMemberSchema);
