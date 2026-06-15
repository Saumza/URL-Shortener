import type { ShortenedURLParams } from "../middleware/shortenedURLValidation.middleware.js";
import { LinkModel, type Link } from "../models/link.model.js";
import { APIError } from "../utils/APIError.js";
import { APIResponse } from "../utils/APIResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import type { Request, Response } from "express";
import { redis } from "../db/redisConnect.js";
import { ShortenedUrlKey } from "../utils/RedisKey.js";

const redirectURL = asyncHandler(async (req: Request<ShortenedURLParams>, res: Response) => {

    const { shortenedId } = req.params

    const urlKey = ShortenedUrlKey(shortenedId)

    const user = await redis.hgetall(urlKey)
    console.log(user);

    // PARSE THE DB DATA OBJECT INTO JSON DATA FOR INDEXING
    if (Object.keys(user).length === 0) {

        console.log("Reached For DB");

        const findURL = await LinkModel.findOneAndUpdate(
            {
                shortenedId
            },
            {
                $inc: { urlClicks: 1 }
            }
        ).select("-createdAt -updatedAt -__v").lean()

        if (!findURL) {
            throw new APIError(404, "URL Not Found")
        }

        const redisHashFile: any = {}

        for (const [key, value] of Object.entries(findURL)) {
            if ((typeof value === "object" || Array.isArray(value)) && value !== null) {
                redisHashFile[key] = JSON.stringify(value)
            }
            redisHashFile[key] = String(value)
        }


        await redis.hset(urlKey, findURL)
        return res.redirect(302, findURL.uploadedURL)
    }


    await redis.hincrby(urlKey, "urlClick", 1)

    if (!user.uploadedURL) {
        console.log("Redis Error")
        throw new APIError(404, "Url Not Found")
    }

    return res.redirect(302, user.uploadedURL)
})

export { redirectURL }