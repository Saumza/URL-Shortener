import { z } from "zod"

export const verifyUploadedURL = z.object({
    uploadedURL: z.string().min(5, { message: "Not a Valid Link" })
})

export const verifyShortenedURL = z.object({
    shortenedId: z.string().max(40, { message: "Not a valid URL" })
})

export const verifyShortenedURLQuery = z.object({
    shortenedUrl: z.string().min(1, { message: "Url is required" }).max(40, { message: "Not a valid URL" }) // add a includes when get a domain name for it to check if its our Url
})