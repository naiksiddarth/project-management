import { asyncHandler } from "../utils/async-handler.js"
import { ApiError } from "../utils/api-error.js"
import { ApiResponse } from "../utils/api-response.js"
import { Project } from "../models/project.models.js"
import { ProjectMember } from "../models/projectmember.models.js"
import mongoose from "mongoose"
import { UserRoleEnum } from "../utils/constants.js"

export const createProject = asyncHandler(async (req, res) => {
    const user = req.user
    if(!user){
        throw new ApiError(400, "Access Token verification Failed")
    }
    const project = await Project.create({
        name: req.body.name,
        description: req.body.description || "",
        createdBy: new mongoose.Types.ObjectId(user._id)
    })

    const projectMember = await ProjectMember.create({
        user: new mongoose.Types.ObjectId(user._id),
        project: new mongoose.Types.ObjectId(project._id),
        role: UserRoleEnum.ADMIN
    })

    return res
        .status(201)
        .json(
            new ApiResponse(201, 
                project,
                "Project created succesfully"
            )
        )
})