import {Server} from "socket.io";
import SocketService from './service'
const socketService = new SocketService()

export const SocketInstance = (server) => {
    const io = new Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    })

    io.on('connection', socket => {
        console.log('user connected')

        socket.on('join-room', async ({room_id}: {room_id: string}) => {
            await socketService.joinRoom(socket, room_id)
        })

        socket.on('create-room', async () => {
            await socketService.createRoom(socket)
        })
        socket.on('disconnect', async () => {
            await socketService.disconnect()
        })
    })
}