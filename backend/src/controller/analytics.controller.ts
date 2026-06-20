import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { APIResponse } from "../utils/APIResponse.js";
import { APIError } from "../utils/APIError.js";
import type { Request, Response } from "express";
import { LinkModel } from "../models/link.model.js";
import { ShortenedUrlKey } from "../utils/RedisKey.js";
import { redis } from "../db/redisConnect.js";


const returnShortenedId = ({ shortenedUrl }: { shortenedUrl: string }) => {
    const userUrl = shortenedUrl

    let url

    if (!(userUrl.startsWith("https://") || userUrl.startsWith("http://"))) {
        url = new URL(`https://${userUrl}`)
    }
    else {
        url = new URL(userUrl)
    }

    const pathname = String(url.pathname).split("/")[1]
    return pathname
}


const urlAnalytics = asyncHandler(async (req: Request, res: Response) => {

    const { shortenedUrl } = req.urlQuery

    // if (!shortenedUrl.includes('')) {
    //     throw new APIError(402, "Invalid Url")
    // }

    const shortenedId = returnShortenedId({ shortenedUrl })
    if (!shortenedId) {
        throw new APIError(400, "ShortenedURL not Received")
    }


    const urlKey = ShortenedUrlKey(shortenedId)
    const user = await redis.hgetall(urlKey)

    if (Object.keys(user).length === 0) {

        const findURL = await LinkModel.findOne({
            shortenedId
        }).select("-updatedAt -__v").lean()

        if (!findURL) {
            throw new APIError(404, "URL Not Available")
        }

        const redisHashFile: any = {}

        for (const [key, value] of Object.entries(findURL)) {
            if ((typeof value === "object" || Array.isArray(value)) && value !== null) {
                redisHashFile[key] = JSON.stringify(value)
            }
            redisHashFile[key] = String(value)
        }


        await redis.hset(urlKey, findURL)
        return res.status(201).json(new APIResponse(201, "Analytics Fetched Successfully", findURL.urlClicks))
    }

    if (!user.uploadedURL) {
        console.log("Redis Error")
        throw new APIError(404, "Url Not Found")
    }

    return res.status(201).json(new APIResponse(201, "Analytics Fetched Successfully", user))
})



export { urlAnalytics }