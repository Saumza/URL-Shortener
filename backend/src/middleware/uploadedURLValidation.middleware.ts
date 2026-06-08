import { APIError } from "../utils/APIError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { verifyUploadedURL } from "../validation/link.validation.js";
import type { Response, Request, NextFunction } from "express"
import { z } from "zod"

export const uploadedURLValidate = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    const { uploadedURL } = req.body()

    const verifyURL = {
        uploadedURL
    }

    const result = verifyUploadedURL.safeParse(verifyURL)

    if (!result.success) {
        const codeError = z.treeifyError(result.error)
        throw new APIError(404, codeError.properties?.uploadedURL?.errors[0] || "Invalid Format")
    }

    next()

})