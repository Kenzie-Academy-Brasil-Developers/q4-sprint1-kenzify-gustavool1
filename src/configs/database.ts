interface User {
    username:string,
    password:string,
    id?:string,
    playlist:{}
}

export let database:User[]  = []
