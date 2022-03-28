import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { config } from '../configs/jwtConfig'

export const tokenValidation = (req:Request, res:Response, next:NextFunction) => {

    
    if( req.headers.authorization ) {
        
        const token = req.headers.authorization.split(" ")[1]
        if (!token ) {
            res.status(400).json({message: "missing header authorization."})
        }
        jwt.verify(token, config.secret, (err) => {
    
            if (err) {
                return res.status(401).json({message:"Invalid token"})
            }
            
            return next()
        })    

    } 


}