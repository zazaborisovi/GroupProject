import mongoose from "mongoose"
import Email from "mongoose-type-email"

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: Email,
        required: true
    },
    password:{
        type: String,
        required: true
    },
})

export const User = mongoose.model("USER", userSchema)