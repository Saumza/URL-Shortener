import { verifyShortenedURLQuery } from "../validation/link.validation.js";
import { APIError } from "../utils/APIError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { type Response, type Request, type NextFunction, response } from "express"
import { z } from "zod"


export interface ShortenedURLQuery {
    shortenedUrl: string
}

export const analyticsURLValidate = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { shortenedUrl } = req.query
    const verifyURL = {
        shortenedUrl
    }

    const result = verifyShortenedURLQuery.safeParse(verifyURL)

    if (!result.success) {
        const codeError = z.treeifyError(result.error)
        throw new APIError(400, codeError.properties?.shortenedUrl?.errors[0] || "Not a Valid Format")
    }
    req.urlQuery = result.data
    next()
})