import mongoose, { Document, Schema } from "mongoose";

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

export const LinkModel = mongoose.model<Link>("Link", linkSchema)