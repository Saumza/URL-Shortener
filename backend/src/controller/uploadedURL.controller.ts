import mongoose from "mongoose";
import { LinkModel } from "../models/link.model.js";
import { APIError } from "../utils/APIError.js";
import { APIResponse } from "../utils/APIResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import type { Request, Response } from "express"

const shortenURL = asyncHandler(async (req: Request, res: Response) => {

    const { uploadedURL } = req.body

    const link = await LinkModel.create({
        uploadedURL,
        urlClicks: 0
    })

    const shortenedURL = `https://shortly/${link.shortenedURL}`

    return res.status(201).json(
        new APIResponse(201, "Link Shortened Successfully", { shortenedURL })
    )
})

export { shortenURL }