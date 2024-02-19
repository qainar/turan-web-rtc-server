import express from "express";
import * as http from "http";
import cors from 'cors'
import {SocketInstance} from "./socket";
import * as mongoose from "mongoose";

const port = 4020
const mongoUri = 'mongodb+srv://kainaraskarov2002:ZXpVW9qvx7El5cLO@web-rtc.xhweuq7.mongodb.net/?retryWrites=true&w=majority'
const app = express()
app.use(cors)
const server = http.createServer(app)
const start = async () => {
    try {
        await mongoose.connect(mongoUri)
        SocketInstance(server)
        server.listen(port, () => {
            console.log('server is running')
        })
    }catch (error) {
        console.error(error)
    }
}

start()