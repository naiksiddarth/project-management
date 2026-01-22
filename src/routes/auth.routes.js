import { Router } from "express"
import { registerUser, loginUser, logoutUser } from "../controllers/auth.controllers.js"
import { validateRegister } from "../validators/auth.validators.js"
import { validate, verifyJWT } from "../middlewares/validator.middlewares.js"

const router = Router();
router.route("/register").post(validateRegister(), validate, registerUser)
router.route('/login').post(loginUser)
router.route('/logout').post(verifyJWT, logoutUser)

export default router;