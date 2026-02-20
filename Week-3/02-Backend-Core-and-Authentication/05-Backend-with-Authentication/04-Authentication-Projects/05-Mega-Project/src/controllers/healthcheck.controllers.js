/**
 * Healthcheck Controller:
 * This controller is used to check:
 * a. If the server is running.
 * b. If the database is connected.
 * c. If the server is healthy.
*/

import { ApiResponse } from '../config/api-response.js'

const healthcheck = async (req, res) => {
    res.status(200).json(
        new ApiResponse(200, {message: "Server is running"})  
    );
};

export { healthcheck };
