/**
 * API Error Response:
 * - Create a custom error class that extends the built-in Error class
 * - Add a statusCode property to the error
 * - Add a message property to the error
 * 
 * - Add a stack property to the error
 * 
 * Note: Read Node Error docs to understand the error class and its methods.
*/

class APIError extends Error {
    constructor(
        statusCode,
        message = "Something went wrong",
        errors = [],
        stack = ""
    ) {
        super(message); 
        this.statusCode = statusCode;
        this.message = message;
        this.success = false;
        this.errors = errors;

        /**
         * If stack is provided, then set it
         * Else, capture the stack trace
        */
        if(stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export { APIError };
