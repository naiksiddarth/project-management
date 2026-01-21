import { User } from "../models/user.models.js"
import { ApiResponse } from "../utils/api-response.js"
import { ApiError } from "../utils/api-error.js"
import { asyncHandler } from "../utils/async-handler.js"
import { sendEmail } from "../utils/mail.js"
import { AccessCookieOptions, RefreshCookieOptions } from "../utils/constants.js"

const generateAccessAndRefreshToken = async (userId) => {
    try{
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })
        return { accessToken, refreshToken}
    } catch{
        throw new ApiError(500, "Something went wrong while generating tokens")
    }
}

const registerUser = asyncHandler(async (req, res) => {
    const {email, username, password, role} = req.body

    const existingUser = await User.findOne({
        $or: [{username}, {email}]
    })

    if (existingUser) {
        throw new ApiError(409, "User with email or username alredy exists", [])
    }

    const user = await User.create({
        email,
        password,
        username,
        isEmailVerified: false
    })

    const { unHashedToken, hasedToken, tokenExpiry } = user.generateTemporaryToken()

    user.emailVerificationToken = hasedToken
    user.emailVerificationExpiry = tokenExpiry
    await user.save({ validateBeforeSave: false })

    sendEmail({
        verificationUrl: `${req.protocol}://${req.get("host")}/api/v1/users/verify-email/${unHashedToken.toString("hex")}`
    })

    const createdUser = await User.findById(user._id).select("-refreshToken -forgotPasswordToken -forgotPasswordExpiry -emailVerificationExpiry")

    if(!createdUser) {
        throw new ApiError(500, "Something went wrong while registiring the user")
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {
                    user: createdUser
                },
                "User is registration succesful and verification mail is sent to your email "
            )
        )

})

const loginUser = asyncHandler(async (req, res) => {
    const {username, password, email} = req.body

    const user = await User.findOne({username: username}).select("username email avatar refreshToken password")
    if (!user){
        throw new ApiError(400, "User not found")
    }
    if(user.checkPassword(password)){
        const { refreshToken, accessToken } = await generateAccessAndRefreshToken(user._id)
    
        return res
        .status(200)
        .cookie("refreshToken", refreshToken, RefreshCookieOptions)
        .cookie("accessToken", accessToken, AccessCookieOptions)
        .json(
            new ApiResponse(
                200,
                {
                    user: user,
                    accessToken: accessToken
                },
                "User logged in successfully"
            )
        )
    }
})

export { registerUser, loginUser }