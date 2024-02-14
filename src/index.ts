import express from "express";
import * as http from "http";
import cors from 'cors'
import {SocketInstance} from "./socket";

const port = 4020
const app = express()
app.use(cors)
const server = http.createServer(app)
SocketInstance(server)

server.listen(port, () => {
    console.log('server is running')
})