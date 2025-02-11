
import  Jwt, { JwtPayload }  from "jsonwebtoken";
import { JWT_SECRET } from "./config";
import { NextFunction,Request,Response } from "express";

 export function userMiddleware(req: Request, res: Response, next: NextFunction) {
    const header=req.headers["authorization"];
    console.log(header);
    const decode = Jwt.verify(header as string, JWT_SECRET);

    if (decode) {
        if(typeof decode==="string"){
            res.status(403).json({
                mgs:"you are not logged in "
            })

        }
        req.userId = (decode as JwtPayload).id;
        next();
    }
    else {
        res.status(403).json({
            msg:"you are not logged in"
        })
        
    }
}
