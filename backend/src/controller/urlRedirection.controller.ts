import type { ShortenedURLParams } from "../middleware/shortenedURLValidation.middleware.js";
import { LinkModel, type Link } from "../models/link.model.js";
import { APIError } from "../utils/APIError.js";
import { APIResponse } from "../utils/APIResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import type { Request, Response } from "express"


const redirectURL = asyncHandler(async (req: Request<ShortenedURLParams>, res: Response) => {

    const { shortenedId } = req.params

    const findURL = await LinkModel.findOne({
        shortenedId
    })

    if (!findURL) {
        throw new APIError(404, "URL Not Found")
    }

    return res.redirect(302, findURL.uploadedURL)

})

export { redirectURL }