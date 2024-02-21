import {Server} from "socket.io";
import SocketService from './service'
import {RoomInterface} from "../interfaces/RoomInterface";
const socketService = new SocketService()

interface IJoinRoomParams extends RoomInterface {
    userName: string;
}
export const SocketInstance = (server: any) => {
    const io = new Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    })

    io.on('connection', socket => {
        console.log('user connected')

        socket.on('join-room', async ({room_id, peer_id, userName}: IJoinRoomParams) => {
            await socketService.joinRoom(socket, {room_id, peer_id, userName})
        })

        socket.on('create-room', async () => {
            await socketService.createRoom(socket)
        })
        socket.on('disconnect', async () => {
            await socketService.disconnect()
        })
    })
}