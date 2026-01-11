import mongoose from "mongoose"

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("✅Mongo Connected")
    } catch (errors) {
        console.log("❌ Mongo connection failed")
        process.exit(1)
    }
}

export { connectDB }
