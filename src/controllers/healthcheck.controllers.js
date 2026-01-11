import { ApiResponse } from "../utils/api-response"

const healthCheck = (req, res) => {
    try {
        res.status(200).json(
            new ApiResponse(200, { message: "Iam fit and fine" }),
        )
    } catch (error) {
        console.log(error)
    }
}
