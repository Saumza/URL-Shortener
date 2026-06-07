import type { Request, Response, NextFunction, RequestHandler } from "express"

type handler = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<any>

export const asyncHandler = (requestHandler: handler): RequestHandler => (req: Request, res: Response, next: NextFunction) => {
    try {
        return requestHandler(req, res, next)
    } catch (error: any) {
        res.status(error.statusCode || 500)
            .json({
                success: false,
                message: error.message
            })
    }
}