import { body } from "express-validator"


export const validateRegister = function () {
    return [
        body("email")
            .trim()
            .notEmpty()
            .withMessage("Email cannot be empty")
            .isEmail()
            .withMessage("Please enter a valid email"),
        body("username")
            .trim()
            .notEmpty()
            .withMessage("Username cannot be empty"),
        body("password")
            .trim()
            .notEmpty()
            .withMessage("Password cannot be empty")
    ]
}