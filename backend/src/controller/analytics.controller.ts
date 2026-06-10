import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { APIResponse } from "../utils/APIResponse.js";
import { APIError } from "../utils/APIError.js";
import type { Request, Response } from "express";
import { LinkModel } from "../models/link.model.js";
import type { ShortenedURLParams } from "../middleware/shortenedURLValidation.middleware.js";


const urlAnalytics = asyncHandler(async (req: Request<ShortenedURLParams>, res: Response) => {

    const { shortenedId } = req.params

    if (!shortenedId) {
        throw new APIError(400, "ShortenedURL not Received")
    }

    const findURL = await LinkModel.findOne({
        shortenedId
    })

    if (!findURL) {
        throw new APIError(404, "URL Not Available")
    }

    return res.status(201).json(new APIResponse(201, "Analytics Fetched Successfully", findURL))


})

export { urlAnalytics }