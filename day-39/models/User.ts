import mongoose, { type Document, Schema } from "mongoose";
import { unique } from "next/dist/build/utils";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    createAt: Date;
    updatedAt: Date;
}


const UserSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true })


export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema)