interface data {
    shortenedURL: string
}

export class APIResponse {
    public status: number
    public message: string
    public data: data
    constructor(status: number, message: string, data: data) {
        this.status = status
        this.message = message
        this.data = data
    }
}