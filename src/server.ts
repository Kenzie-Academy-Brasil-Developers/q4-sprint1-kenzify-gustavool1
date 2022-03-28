import app from "./app";
import dotenv from 'dotenv'

dotenv.config()
const PORT = process.env.RUN_PORT ? process.env.RUN_PORT : 3000;

app.listen(PORT);