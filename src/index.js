import dotenv from "dotenv"
import app from "./app.js"
import { connectDB } from "./db/db.js"

dotenv.config({
    path: "./.env",
    quiet: true,
})

const PORT = process.env.PORT || 3000

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`app listening on http://localhost:${PORT}`)
        })
    })
    .catch((error) => {
        console.log(error)
        process.exit()
    })
