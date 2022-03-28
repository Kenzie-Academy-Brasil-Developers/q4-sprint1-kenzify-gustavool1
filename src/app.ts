import express, {Request, Response} from 'express'
import routes from './routes'
const app = express()

routes(app)

export default app