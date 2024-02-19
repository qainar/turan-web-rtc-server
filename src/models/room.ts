import {model, Schema} from "mongoose";

const RoomSchema = new Schema({
    room_id: {
        type: String,
        required: true
    },
    peer_id: {
        type: String
    }
})

export default model('Room', RoomSchema)