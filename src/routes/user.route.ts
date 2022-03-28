
import { Router, Application, Request, Response } from "express";
import { createUser, deleteSong, getUsers, loginIn, updateUserPlaylist }  from "../controllers/user.controller";
import validate from "../middlewares/validate";
import { tokenValidation } from "../middlewares/validateToken.middleware";
import { validatingUserExistence } from "../middlewares/validatingUserExistence.middleware";
import { playlistSchema } from "../schemas/playlist.schemas";
import userSchema from "../schemas/user.schemas";

const routes = Router()


const userRoutes = (app:Application) => {
    
    routes.post(
        "/register",
        validate(userSchema),
        validatingUserExistence,
        createUser
    )


    routes.post(
        "/login", 
        validate(userSchema),
        validatingUserExistence,
        loginIn
    )


    routes.get(
        "", 
        tokenValidation,
        getUsers
    )

    
    routes.put(
        "/playlist", 
        tokenValidation, 
        updateUserPlaylist
    )
    
    routes.delete(
        "/playlist", 
        tokenValidation,
        deleteSong
    )
    
    app.use("/users", routes)
}


export default userRoutes