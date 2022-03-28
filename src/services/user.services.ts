import jwt from 'jsonwebtoken'
import { decode } from 'punycode'
import { database } from '../configs/database'
import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { v4 }from 'uuid'
import { config } from '../configs/jwtConfig'

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




export const decodingToken = (token:string) : User =>  {

    const decoded  = jwt.verify(token, config.secret, (err, decoded) => {

        if (err) {
          return false
        }
        
        if (decoded) {
           return decoded as User
        }
    });


    return decoded as unknown as User

}   

export const generatingUserToken = (user:User) => {

    const token = jwt.sign(user, config.secret, { expiresIn: config.expiresIn })

    return token
}



export const serializingUser = async (user:User) => {

    return {
        id:v4(),
        username: user.username,
        password:await bcrypt.hash(user.password, 10),
        playlist:{}
    }
}


export const serializingSong = (song:Song) => {
    song.title = song.title.split(' ').map((word: string) => word[0].toUpperCase() + word.substring(1).toLowerCase()).join(' ')

    return song
}



export const listeningSong = (user:User, song:string, artist:string) => {


    if(!user.playlist[artist as string]) {
        return false
    }
    const selectedSong  = user.playlist[artist as string].find((music) => music.title.toLowerCase() === (song as string).toLowerCase())
       

    if (selectedSong) {

        if (selectedSong.listenedByMe === 0 || selectedSong.listenedByMe) {

            selectedSong.listenedByMe  += 1
            return selectedSong
        }
    }
    if (!selectedSong) {
        return false
    }
}


export const deletingSong = (user:User, artist:string, song:string) => {
    
    if(!user.playlist[artist as string] ) {
            return false
    }

    const newSongs  = user.playlist[artist as string].filter((music) => music.title.toLowerCase() !== (song as string).toLowerCase())

    if (newSongs.length === 0) {
        
        delete user.playlist[artist as string]
        return true
    }
    user.playlist[artist as string] = newSongs
    return true
}