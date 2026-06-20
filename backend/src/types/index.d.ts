import { Express } from "express";

declare module 'express-serve-static-core' {
    interface Request {
        urlQuery: {
            shortenedUrl: string
        }
    }
}