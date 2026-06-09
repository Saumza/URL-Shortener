import { Router } from "express";
import { shortenedURLValidate } from "../middleware/shortenedURLValidation.middleware.js";
import { redirectURL } from "../controller/urlRedirection.controller.js";


const router = Router()

router.route("/:shortenedId").get(shortenedURLValidate, redirectURL)

export {router as redirectURLRoute}