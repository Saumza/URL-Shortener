import mongoose, { Document, Schema } from "mongoose";
import bcryt from "bcrypt"

export interface Link extends Document {
    shortenedId: string,
    uploadedURL: string,
    urlClicks: number
}


const linkSchema: Schema<Link> = new Schema({
    shortenedId: {
        type: String,
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