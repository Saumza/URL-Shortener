import { APIError } from "../utils/APIError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { verifyShortenedURL } from "../validation/link.validation.js";
import { type Response, type Request, type NextFunction, response } from "express"
import { z } from "zod"

export interface ShortenedURLParams {
    shortenedId: string
}

export const shortenedURLValidate = asyncHandler(async (req: Request<ShortenedURLParams>, res: Response, next: NextFunction) => {
    const { shortenedId } = req.params
    const verifyURL = {
        shortenedId
    }

    const result = verifyShortenedURL.safeParse(verifyURL)
    console.log("Validation:", result);

    if (!result.success) {
        const codeError = z.treeifyError(result.error)
        throw new APIError(400, codeError.properties?.shortenedId?.errors[0] || "Not a Valid Format")
    }
    next()
})