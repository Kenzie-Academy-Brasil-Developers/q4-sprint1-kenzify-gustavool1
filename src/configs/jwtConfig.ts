import dotenv from 'dotenv'


dotenv.config() 


export const config = {
    secret: process.env.SECRET_KEY ?process.env.SECRET_KEY : "my_random_secret_key",
    expiresIn: process.env.EXPIRES_IN ? process.env.EXPIRES_IN : "1h",
  };