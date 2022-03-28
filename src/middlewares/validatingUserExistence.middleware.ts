import { NextFunction, Request, Response} from 'express'
import { database } from '../configs/database'


export const validatingUserExistence =(req:Request, res:Response, next:NextFunction) => {
    
    const { username } = req.body
    const userExists = database.find((userDb) => userDb.username ===  username )
    const endPoint = req.originalUrl

    if (userExists) {

        if (endPoint === "/users/login") {
            
            return next()

        } else {
            return res.status(422).json({ message: "You can not use this username."})
        }
    } else {
        next()
    }
    
}

