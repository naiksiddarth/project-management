import { Router } from "express"
import { createProject } from "../controllers/project.controllers.js"
import { verifyJWT } from "../middlewares/validator.middlewares.js"

const router = Router()

router.route("/")
    .post( verifyJWT, createProject )

export default router