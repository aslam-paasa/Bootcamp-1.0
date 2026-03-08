import { NextFunction, Request, Response } from "express";
import { JWT_PASSWORD } from "./config";
import jwt, { JwtPayload } from "jsonwebtoken";

/**
 * Checks if user is logged in by validating their auth token:
 * - Gets auth token from request header
 * - Verifies token is valid
 * - Adds user ID to request if valid
 * - Returns error if invalid
 * - Uses @ts-ignore since we know token is valid
*/
export const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const header = req.headers["authorization"];
        
        // Header should exist
        if (!header) {
            res.status(403).json({
                message: "No authorization header found" 
            });
            return;
        }

        const decoded = jwt.verify(header as string, JWT_PASSWORD);

        // jwt.verify ka output ya toh string hoga ya JwtPayload object
        if (typeof decoded === "string") {
            res.status(403).json({
                message: "Invalid token format"
            });
            return;
        }

        // Ab hum sure hain ki decoded ek JwtPayload hai
        req.userId = (decoded as JwtPayload).id;
        next();

    } catch (err) {
        // Token verification fail ho gaya
        res.status(403).json({ 
            message: "Invalid token" 
        });
    }
}