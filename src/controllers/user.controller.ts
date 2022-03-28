
import {  Request, Response } from "express";
import bcrypt from 'bcrypt'
import { playlistSchema } from "../schemas/playlist.schemas";
import validateSong from "../middlewares/validateSong.middleware";
import { database } from "../configs/database";
import { decodingToken, deletingSong, generatingUserToken, listeningSong, serializingSong,  serializingUser  } from "../services/user.services";


interface Song  {
    [x: string]: any;
    title:string,
    duration:string,
    releasedDate:string,
    genres: [string],
    listenedByMe?:number
}


interface User {
    username:string,
    password:string,
    id?:string,
    playlist:{
        [key:string]: Song[]
    }
}
    

export const createUser = async (req:Request, res:Response) => {
    const data  = req.body

    const user  = await serializingUser(data)

    database.push(user)

    const {password, ...userSerialized } = user 

    res.status(201).json(userSerialized)
}


export const loginIn = async (req:Request, res:Response) => {

    const { username, password } = req.body
    const user = database.find((userDb) => userDb.username === username)

    if (!user) {
        return res.status(401).json({
            message: "Wrong credentials. Try again!"
        })
    }
    if ( user ) {
        const passwordMatches = await bcrypt.compare(password, user.password)
        
        if (passwordMatches) {
            const token =  generatingUserToken(user)
            return res.status(200).json({accessToken:token})
        }
        
        return res.status(401).json({
            message: "Wrong credentials. Try again!"
        })


    }

}


export const getUsers  = (req:Request, res:Response) => {

    const newDb = database.map((user) => {
        const {password, ...newUser} = user

        return newUser
    })
    res.status(200).json(newDb)
}


export const updateUserPlaylist = async ( req:Request, res:Response) => {

    if (req.headers.authorization) {
        const { artist, song } = req.query

        const token = req.headers.authorization.split(" ")[1] 
        const decodedUser:User = decodingToken(token)
        const user:User | undefined  = database.find((user) => user.id === decodedUser.id)


        if ( song && artist && user?.playlist) {
                
            const isAdded = listeningSong(user, (song as string), (artist as string))

            if (isAdded) {
                return res.send(isAdded)

            } if (!isAdded) {
                return res.status(404).json({message:"A song with this title was not found in this playlist"})

            }
            
            
        }
      

        if (user && (!song || !artist)) {
            const artistName = Object.keys(req.body)[0]
            const songSerialized = serializingSong(req.body[artistName][0]) 
            await validateSong(playlistSchema, songSerialized)
            const completeSong = {...songSerialized, listenedByMe:0}
        

            const hasMusicInPlaylist = user.playlist[artistName]

            if (hasMusicInPlaylist) {

                user.playlist[artistName] = [...hasMusicInPlaylist,completeSong] 
            }if (!hasMusicInPlaylist) {
                user.playlist[artistName] = [completeSong] 
            }

            const index = database.findIndex((user) => user.id === decodedUser.id)
            database[index] = user

            const { password, ...serializedUser } = user
            res.status(200).json({...serializedUser})

        }
         else {
            res.status(401).json({message:"User not found"})
        }
 
      

       
     
    }

}

export const deleteSong =  (req:Request, res:Response) => {
    
    
    if (req.headers.authorization) {

        const { artist, song }  = req.query
        const token = req.headers.authorization.split(" ")[1] 

        const decodedUser = decodingToken(token)
        const user:User | undefined  = database.find((user) => user.id === decodedUser.id)


        if (user) {


            const isDelete = deletingSong(user, (artist as string), (song as string))

            if (isDelete) {
                
                return res.status(204).send("")
            } if (!isDelete) {
                return res.status(404).json({message:"This song was not found"})
            }

        }

    }
    
}

