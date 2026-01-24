import { Router } from "express"
import { createProject, getProjects } from "../controllers/project.controllers.js"
import { verifyJWT } from "../middlewares/validator.middlewares.js"

const router = Router()

router.route("/")
    .post( verifyJWT, createProject )
    .get( verifyJWT, getProjects)

export default router