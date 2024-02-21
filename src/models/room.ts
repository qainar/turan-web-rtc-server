// import {model, Schema, Model, Document} from "mongoose";
//
// interface IUser {
//     peerId: string;
//     userName: string;
// }
//
// interface IRoom {
//     roomId: string;
//     participants: Record<string, IUser>;
// }
//
// interface IRoomModel extends Document, IRoom {}
//
// const RoomSchema = new Schema({
//     room_id: {
//         type: String,
//         required: true
//     },
//     peer_id: {
//         type: String
//     }
// })
//
// export const Room: Model<IRoomModel>  = model('Room', RoomSchema)