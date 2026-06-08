import { z } from "zod"

export const verifyUploadedURL = z.object({
    uploadedURL: z.string().min(5, { message: "Not a Valid Link" })
})

export const verifyShortenedURL = z.object({
    shortenedURL: z.string().max(20, { message: "Not a valid URL" })
})