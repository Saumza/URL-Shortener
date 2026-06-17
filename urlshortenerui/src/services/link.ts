import axios, { isAxiosError } from "axios";

class linkService {
    private baseUrl: string
    constructor() {
        this.baseUrl = process.env.BACKEND_API_URL || "http://localhost:8001"
    }

    async uploadUrl<T>({ uploadedURL }: { uploadedURL: string }) {
        try {
            return await axios.post<T>(`${this.baseUrl}/api/uploadURL`, { uploadedURL })
        } catch (error: any) {
            throw error
        }
    }

    async urlAnalytics<T>({ shortenedId }: { shortenedId: string }) {
        try {
            return await axios.get<T>(`${this.baseUrl}/api/analytics/${shortenedId}`)
        } catch (error) {
            throw error
        }
    }
}

export const link = new linkService()