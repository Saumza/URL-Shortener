import { Express } from "express";

declare module 'express' {
    interface Request {
        urlQuery: {
            shortenedUrl: string
        }
    }
}