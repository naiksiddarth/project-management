import mongoose, { mongo, Schema } from "mongoose"
import { TaskStatusEnum, AvailableTaskStatuses } from "../utils/constants.js"

const taskSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: "Project",
        required: true
    },
    details: String,
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    assignedBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    assignedTo: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    status: {
        type: String,
        enum: AvailableTaskStatuses,
        default: TaskStatusEnum.TODO
    },
    attachment: {
        type: [{
            url: String,
            mimetype: String,
            size: Number
        }],
        default: []

    }
},
{
    timestamps: true
})

export const Task = mongoose.model("Task", taskSchema)