import { Router } from "express";
import { uploadedURLValidate } from "../middleware/uploadedURLValidation.middleware.js";
import { shortenURL } from "../controller/uploadedURL.controller.js";

const router = Router()

router.route("/uploadURL").post(uploadedURLValidate, shortenURL)

export { router as uploadURLRouter }