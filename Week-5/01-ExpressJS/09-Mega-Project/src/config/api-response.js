/**
 * API Response:
 * - Create a custom response class that extends the built-in Response class
 * - Add a statusCode property to the response
 * - Add a message property to the response
 * - Add a data property to the response
 * - Add a success property to the response
 * - Add a errors property to the response
*/

class ApiResponse {
    constructor(statusCode, data, message = "Success") {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400;
    }
}

export { ApiResponse };
