import { connectToDB } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import User from '@/models/User'
import { generateToken, hashPassword, setAuthCookies } from "@/lib/auth";

export const POST = async (request: NextRequest) => {

    try {
        const { email, password, name } = await request.json()

        if (!email || !password || !name) {
            return NextResponse.json({ error: "All fields are required" }, { status: 401 })
        }

        await connectToDB()


        const user = await User.findOne({ email })

        if (user) {
            return NextResponse.json({ error: "Email already exist" }, { status: 400 })
        }

        const passwordHash = await hashPassword(password)

        const newUser = await User.create({
            name,
            email,
            password: passwordHash
        })

        delete newUser.password

        const token = await generateToken(newUser._id.toString())
        await setAuthCookies(token)

        return NextResponse.json({ message: 'Logged in succesfully!', data: newUser })

    } catch (error) {
        console.log(error)

        return NextResponse.json({ error: "Internel server error" }, { status: 500 })

    }

}