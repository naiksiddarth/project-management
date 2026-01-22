import { validationResult } from "express-validator"
import { ApiError } from "../utils/api-error.js"
import jwt from "jsonwebtoken"
import { User } from "../models/user.models.js"

export const validate = function (req, res, next) {
    const errors = validationResult(req)
    if(errors.isEmpty()) return next()
    const extractedErrors = []
    errors.array().map((error) => {
        extractedErrors.push({[error.path]: error.msg})
    })
    throw new ApiError(422, "Recieved data is not valid", extractedErrors)
}

export const verifyJWT = async function (req, res, next) {
    const accessToken = req.cookies.accessToken || req.headers.authorization?.split(" ")[1]
    if(!accessToken) {
        throw new ApiError(400, "Access Token not found in cookies or headers")
    }
    let user = undefined
    try{
        user = await jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
    } catch(err) {
        throw new ApiError(400, "Error verifying access token")
    }
    const loggedInUser = await User.findById(user._id)

    req.user = loggedInUser
    return next()
}