import * as http from 'http';
import HttpStatusCode from '../../commons/constants/HttpStatusCode';

/**
 * @export
 * @class ParametersError
 * @extends {Error}
 */
export class ParametersError extends Error {
    status: number;
    message: string;

    /**
     * Creates an instance of HttpError.
     * @param {number} [status]
     * @param {string} [message]
     * @memberof ParametersError
     */
    constructor(message: string, status ? : number) {
        super(message);

        Error.captureStackTrace(this, this.constructor);

        this.status = status || HttpStatusCode.BAD_REQUEST;
        this.message = message || http.STATUS_CODES[this.status] || 'Error';
    }
}

/**
 * @export
 * @class UnauthorizedError
 * @extends {Error}
 */
export class UnauthorizedError extends Error {
    status: number;
    message: string;

    /**
     * Creates an instance of HttpError.
     * @param {number} [status]
     * @param {string} [message]
     * @memberof ParametersError
     */
    constructor(message: string, status ? : number) {
        super(message);

        Error.captureStackTrace(this, this.constructor);

        this.status = status || HttpStatusCode.UNAUTHORIZED;
        this.message = message || http.STATUS_CODES[this.status] || 'Error';
    }
}

/**
 * @export
 * @class ForbiddenError
 * @extends {Error}
 */
export class ForbiddenError extends Error {
    status: number;
    message: string;

    /**
     * Creates an instance of HttpError.
     * @param {number} [status]
     * @param {string} [message]
     * @memberof ParametersError
     */
    constructor(message: string, status ? : number) {
        super(message);

        Error.captureStackTrace(this, this.constructor);

        this.status = status || HttpStatusCode.FORBIDDEN;
        this.message = message || http.STATUS_CODES[this.status] || 'Error';
    }
}

/**
 * @export
 * @class NotFoundError
 * @extends {Error}
 */
export class NotFoundError extends Error {
    status: number;
    message: string;

    /**
     * Creates an instance of HttpError.
     * @param {number} [status]
     * @param {string} [message]
     * @memberof ParametersError
     */
    constructor(message: string, status ? : number) {
        super(message);

        Error.captureStackTrace(this, this.constructor);

        this.status = status || HttpStatusCode.NOT_FOUND;
        this.message = message || http.STATUS_CODES[this.status] || 'Error';
    }
}