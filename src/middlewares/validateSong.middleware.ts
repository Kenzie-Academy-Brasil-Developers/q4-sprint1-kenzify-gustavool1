import { AnySchema }from 'yup'
import {Request, Response, NextFunction} from 'express'



interface Song  {
    title:string,
    duration:string,
    releasedDate:string,
    genres: [string]
}


const validateSong = async (schema:AnySchema, data:Song) => {
    
    try {
      await schema.validate(data);
      return true
    } catch (e:any) {
      return false
    }
  };

export default validateSong 
