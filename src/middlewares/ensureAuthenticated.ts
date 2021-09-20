import { Request, NextFunction, Response } from "express";

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
    const authToken = req.headers.authorization;
    if (!authToken) {
        res.status(400).json({
            message: "Unauthorized"
        });
    }
    const [, token] = authToken.split(" ");
    try {
        if (token === "admin") {
            return next();
        } else {
            res.status(400).send();
        }
    } catch (err) {
        res.status(400).send();
    }

}