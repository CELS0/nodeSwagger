import { Request,NextFunction, Response } from "express";

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction){
const authToken = req.headers.authorization;

if(!authToken){
    res.status(401).json({ 
        message: "Token invalid"
    });

    const [,token] = authToken.split(" ");

    try{ 
        if(token ==="admin"){
            return next();
        }
    }catch(err){
        res.status(401).send();
    }
}
}