import mongoose, { Document, Schema } from "mongoose";
import bcryt from "bcrypt"

interface Link extends Document {
    shortenedURL: string,
    uploadedURL: string,
    urlClicks: number
}


const linkSchema: Schema<Link> = new Schema({
    shortenedURL: {
        type: String,
        required: true,
        unique: true
    },
    uploadedURL: {
        type: String,
        required: true,
    },
    urlClicks: {
        type: Number,
        required: true
    }
})

linkSchema.pre("save", async function (next) {
    if (!this.isModified("uploadedURL")) return next

    this.shortenedURL = await bcryt.hash(this.uploadedURL, 10)
})

export const LinkModel = mongoose.model<Link>("Link", linkSchema)