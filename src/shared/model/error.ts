import { AxiosError, isAxiosError } from 'axios';

export enum ErrorCodes {
    Unathorized = '401',
    PasswordsMismatch = '1800',
}

export class ApiError extends AxiosError {
    constructor(error: any) {
        super(error?.message, error?.code, error?.config, error?.request, error?.response);

        this.name = error?.name;
        this.stack = error?.stack;

        if (isAxiosError(error)) {
            // FIXME: remove with only one field after fix on the backend
            this.code = (error?.response?.data?.statusCode ?? error?.response?.data?.code)?.toString();
            this.message = error?.response?.data?.message;
        }
    }
}
