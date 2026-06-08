import { APIError } from "../utils/APIError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { verifyUploadedURL } from "../validation/link.validation.js";
import type { Response, Request, NextFunction } from "express"
import { z } from "zod"

interface ShortenedURLParams {
    shortenedURL: string
}

export const shortenedURLValidate = asyncHandler(async (req: Request<ShortenedURLParams>, res: Response, next: NextFunction) => {
    const { shortenedURL } = req.params

    const verifyURL = {
        shortenedURL
    }

    const result = verifyUploadedURL.safeParse(verifyURL)

    if (!result.success) {
        const codeError = z.treeifyError(result.error)
        throw new APIError(400, codeError.properties?.uploadedURL?.errors[0] || "Not a Valid Format")
    }
    next()
})