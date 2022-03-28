import * as yup from 'yup'
import { v4 } from 'uuid'
import bcrypt from 'bcrypt';


const userSchema = yup.object().shape({
    uuid: yup
        .string()
        .default(() => v4())
        .transform(() => v4()),
    username: yup.string().required(),
    password: yup
        .string()
        .min(4)
        .required()
        .transform((pwd) => bcrypt.hashSync(pwd, 10)),


})

export default userSchema