import express from "express"
import cors from "cors"

const app = express()

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization"],
    }),
)

import healthCheckRouter from "./routes/healthcheck.routes.js"
app.use("/api/v1/healthcheck", healthCheckRouter)

app.get("/", (req, res) => {
    res.send("Hello")
})

export default app
