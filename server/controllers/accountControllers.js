import USER from "../models/userModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

export const reg = async(req , res) =>{
    try {
        const {username , email , password} = req.body
        const UserCheck = await USER.findOne({username})
        const EmailCheck = await USER.findOne({email})

        if (UserCheck){
            return res.status(400).json({message: "user with that username already exists"})
        }
        if (EmailCheck){
            return res.status(400).json({message: "Email already in use"})
        }

        const HashedPassword = await bcrypt.hash(password , 10)
        const newUser = await USER.create({username , email , password:HashedPassword})
        res.status(200).json({message:"user registered succesfully"})

        const sessionToken = jwt.sign({ userId: newUser._id }, process.env.SECRETKEY , { expiresIn: "7d" })
        res.cookie("session_token", sessionToken, { httpOnly: true, secure: true } )

    } catch (err) {
        console.log(err)
        res.status(500).json({message: "couldnt register user"})
    }
}

export const login = async(req , res) =>{
    try {
        const {username , email , password} = req.body
        const user = await USER.findOne({username})
        if (!user){
            return res.status(500).json({message: "couldnt find user with specified name"})
        }
        const PasswordCheck = await bcrypt.compare(password , user.password)
        if (!PasswordCheck){
            return res.status(500).json({message: "incorrect password"})
        }
        const sessionToken = jwt.sign({ userId: user._id }, process.env.SECRETKEY , { expiresIn: "7d" })
        res.cookie("session_token" , sessionToken , {httpOnly:true , secure: true} )
        return res.status(200).json({message: "logged in succesfully"})
    } catch (err) {
        res.status(500).json({message: `error logging in ${err}`})       
    }
}

export const logout = async(req , res) =>{
    try {
        res.clearCookie("session_token")
        res.status(200).json({message: "Logged out successfully"})
    } catch (err) {
        res.status(500).json({message: err})
    }
}