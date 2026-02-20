/**
 * 1. Create server and express app:
*/

import express from "express";
const app = express();

/**
 * 6. Import Routes:
 * a. Healthcheck Routes
 * b. Auth Routes
 * c. Note Routes
 * d. Project Routes
 * e. Task Routes
*/
import healthcheckRoutes from "./routes/healthcheck.routes.js";


/**
 * 7. Routes:
*/
app.use("/api/v1/healthcheck", healthcheckRoutes);


export default app;