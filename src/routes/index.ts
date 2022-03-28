import express,{ Application } from "express"
import userRoutes from "./user.route"




const routes = (app:Application) => {
    
    app.use(express.json())

    userRoutes(app)
}

export default routes