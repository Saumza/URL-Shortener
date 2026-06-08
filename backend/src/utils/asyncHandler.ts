import type { Request, Response, NextFunction, RequestHandler } from "express"

type handler<P> = (
    req: Request<P>,
    res: Response,
    next: NextFunction
) => Promise<any>

export const asyncHandler = <P>(requestHandler: handler<P>): RequestHandler<P> => async (req: Request<P>, res: Response, next: NextFunction) => {
    try {
        return await requestHandler(req, res, next)
    } catch (error: any) {
        res.status(error.status || 500)
            .json({
                success: false,
                message: error.message
            })
    }
}