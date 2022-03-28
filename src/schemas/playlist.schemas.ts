import * as yup from 'yup'

export const playlistSchema = yup.object().shape({
    title:yup.string().required(),
    duration:yup.string().trim().required(),
    releasedDate:yup.string().required(),
    listenedByMe:yup.number().positive(),
    genres: yup.array().of(yup.string()).required()
})