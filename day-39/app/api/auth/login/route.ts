import { connectToDB } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import User from '@/models/User'
import { generateToken, setAuthCookies, verifyPassword } from "@/lib/auth";

export const POST = async (request: NextRequest) => {

    try {
        const { email, password } = await request.json()

        if (!email || !password) {
            return NextResponse.json({ error: "All fields are required" }, { status: 401 })
        }

        await connectToDB()


        const user = await User.findOne({ email })

        if (!user) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
        }

        const isValidPassowrd = await verifyPassword(password, user.password)

        if (!isValidPassowrd) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
        }


        const token = await generateToken(user._id.toString())
        await setAuthCookies(token)



        return NextResponse.json({ message: 'Logged in succesfully!' })

    } catch (error) {

        return NextResponse.json({ error: "Internel server error" }, { status: 500 })

    }

}