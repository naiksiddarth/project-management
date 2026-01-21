import { Router } from "express"
import { registerUser, loginUser } from "../controllers/auth.controllers.js"
import { validateRegister } from "../validators/auth.validators.js"
import { validate } from "../middlewares/validator.middlewares.js"

const router = Router();
router.route("/register").post(validateRegister(), validate, registerUser)
router.route('/login').post(loginUser)

export default router;