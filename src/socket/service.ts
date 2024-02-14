import {v4 as uuidv4} from 'uuid'

export default class SocketService {
    async createRoom(socket){
        const room_id = uuidv4()
        socket.emit('room-created', {room_id})
        console.log('room created ' + room_id)
    }
    async joinRoom(socket, room_id){
        console.log('join room ' + room_id)
        socket.join(room_id)
    }
    async disconnect(){
        console.log('user disconnected')
    }
}
