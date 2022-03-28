import {Request, Response, NextFunction} from 'express'
import { AnySchema }from 'yup'

const validate = (schema:AnySchema) => async (req:Request, res:Response, next:NextFunction) => {
    const resource = req.body;
    try {
      await schema.validate(resource);
      next();
    } catch (e:any) {
      res.status(400).json({ error: e.errors.join(", ") });
    }
  };

export default validate

