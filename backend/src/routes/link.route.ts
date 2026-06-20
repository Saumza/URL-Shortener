import { Router } from "express";
import { uploadedURLValidate } from "../middleware/uploadedURLValidation.middleware.js";
import { shortenURL } from "../controller/uploadedURL.controller.js";
import { urlAnalytics } from "../controller/analytics.controller.js";
import { analyticsURLValidate } from "../middleware/analyticsURLValidation.js";

const router = Router()

router.route("/uploadURL").post(uploadedURLValidate, shortenURL)
router.route("/analytics").get(analyticsURLValidate, urlAnalytics)

export { router as uploadURLRouter }