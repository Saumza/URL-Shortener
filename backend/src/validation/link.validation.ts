import { z } from "zod"

export const linkValidation = z.object({
    uploadedURL: z.string().min(5, { message: "Not a Valid Link" })  
})