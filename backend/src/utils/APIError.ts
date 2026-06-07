import { AxiosError } from "axios";

class APIError extends AxiosError {
    public status: number;
    constructor(status: number, message: string) {
        super(message)
        this.status = status
    }
}

export { APIError }