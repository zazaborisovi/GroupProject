import express from "express";
import cors from "cors";
import dotenv from "dotenv";

const app = express()
dotenv.config()

const PORT = process.env.PORT || 6969
app.use(cors())
app.use(express.json())

app.get("/" , (req , res) =>{
    res.status(202).json({message: "server is running"})
})

app.listen(PORT, () =>{
    console.log(`server is running at localhost:${PORT}`)
})