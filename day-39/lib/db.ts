import mongoose from "mongoose";

const MONGODB_URL: string = process.env.MONGODB_URL!

// if(MONGODB_URL){

// }

const global: any = {
    mongoose: { conn: null, promise: null }
}

let cached = global.mongoose

if (!cached) [
    cached = global.mongoose = { conn: null, promise: null }
]

export async function connectToDB() {

    if (cached.conn) {
        return cached.conn
    }


    if (!cached.promise) {
        const opts = {
            bufferCommands: false
        }

        cached.promise = mongoose.connect(MONGODB_URL, opts).then((mongo) => {
            return mongo
        })
    }


    try {
        cached.conn = await cached.promise
    } catch (error) {
        cached.promise = null
        throw error

    }

    return cached.conn

}