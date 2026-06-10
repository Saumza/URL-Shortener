import mongoose from "mongoose";
import { LinkModel, type Link } from "../models/link.model.js";
import { APIError } from "../utils/APIError.js";
import { APIResponse } from "../utils/APIResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import type { Request, Response } from "express"
import { customAlphabet, nanoid } from "nanoid";

const shortenURL = asyncHandler(async (req: Request, res: Response) => {

    const { uploadedURL } = req.body

    const custom = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const nanoid = customAlphabet(custom, 15)

    let shortenedId: string = nanoid()
    let link: Link

    while (true) {
        try {
            link = await LinkModel.create({
                uploadedURL,
                shortenedId,
                urlClicks: 0
            })
            break
        } catch (error: any) {
            console.log(error);
            if (error.code == 11000) {
                shortenedId = nanoid()
                continue
            }
        }
    }

    const shortenedURL = `https://shortly/${link.shortenedId}`

    return res.status(201).json(
        new APIResponse(201, "Link Shortened Successfully", shortenedURL)
    )
})

export { shortenURL }