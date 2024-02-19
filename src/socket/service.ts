import {v4 as uuidv4} from 'uuid'
import {Socket} from "socket.io";
import {RoomInterface} from "../interfaces/RoomInterface";
import Room from "../models/room";

export default class SocketService {
    async createRoom(socket: Socket){
        const room_id = uuidv4()
        socket.emit('room-created', {room_id})
        console.log('room created ' + room_id)

        await Room.create({
            room_id: room_id,
        })
    }
    async joinRoom(socket: Socket, {room_id, peer_id}: RoomInterface){
        console.log('join room ' + room_id)
        console.log(peer_id + ' peer_id')
        socket.join(room_id)
    }
    async disconnect(){
        console.log('user disconnected')
    }
}
