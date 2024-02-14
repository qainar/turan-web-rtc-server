import express from "express";
import * as http from "http";
import {Server} from "socket.io";
import cors from 'cors'

const port = 4020
const app = express()
app.use(cors)
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
})

io.on('connection', socket => {
    console.log('user connected')

    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
})


server.listen(port, () => {
    console.log('server is running')
})