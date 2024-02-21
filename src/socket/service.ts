import {v4 as uuidv4} from 'uuid'
import {Socket} from "socket.io";
import {RoomInterface} from "../interfaces/RoomInterface";
import mongoose, {Model} from "mongoose";
// import {Room} from "../models/room";
// import {Chat} from "../models/chat";

interface IUser {
    peer_id: string;
    userName: string;
}

interface IRoom {
    room_id: string;
    participants: Record<string, IUser>;
}

interface IMessage {
    content: string;
    author?: string;
    timestamp: number;
}

interface IChat {
    room_id: string;
    messages: IMessage[];
}

const RoomModel = mongoose.model("Room", new mongoose.Schema({
    room_id: String,
    participants: Object,
}));

const ChatModel = mongoose.model("Chat", new mongoose.Schema({
    room_id: String,
    messages: Array,
}));

interface IJoinRoomParams extends RoomInterface {
    userName: string;
}
export default class SocketService {
    async createRoom(socket: Socket){
        const room_id = uuidv4()
        socket.emit('room-created', {room_id})
        console.log('room created ' + room_id)

        await RoomModel.create({
            room_id,
            participants: {}
        })
    }
    async joinRoom(socket: Socket, {room_id, peer_id, userName}: IJoinRoomParams){
        let room = await RoomModel.findOne({room_id})
        if (!room){
            await RoomModel.create({room_id, participants: {}})
        }

        const chat = await ChatModel.findOne({room_id})
        if (!chat){
            await ChatModel.create({
                room_id,
                messages: []
            })
        }else {
            socket.emit("get-messages", chat.messages)
        }

        console.log("user joined the room", room_id, peer_id, 
        // userName
        );
        const filter = {
            room_id: room_id
        }
        const update = {
            $set: { [`participants.${peer_id}`]: { peer_id, 
                // userName 
            } }
        }
        room = await RoomModel.findOneAndUpdate(
            filter, update, { new: true, upsert: true, useFindAndModify: false }
        );

        socket.join(room_id)
        socket.to(room_id).emit("user-joined", { peer_id, 
            // userName 
        });
        if (room){
            socket.emit("get-users", {
                room_id,
                participants: room.participants,
            });
        }

        socket.on("disconnect", () => {
            console.log("user left the room", peer_id);
            this.leaveRoom({ room_id, peer_id }, socket);
        });
    }
    async disconnect(){
        console.log('user disconnected')
    }

    async leaveRoom({ peer_id, room_id }: RoomInterface, socket: Socket){
        await RoomModel.findOneAndUpdate(
            { room_id },
            { $unset: { [`participants.${peer_id}`]: 1 } }
          );
          
          socket.to(room_id).emit("user-disconnected", peer_id);
    };
}
