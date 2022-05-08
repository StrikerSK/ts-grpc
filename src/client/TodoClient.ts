// @ts-ignore
import path from "path";
import * as grpc from '@grpc/grpc-js'
import {grpcObject, PORT} from "../Utils";

export const client = new grpcObject.todo.TodoService(
    `0.0.0.0:${PORT}`, grpc.credentials.createInsecure()
)

// const deadline = new Date()
// deadline.setSeconds(deadline.getSeconds() + 5)
// client.waitForReady(deadline, (err) => {
//     if (err) {
//         console.error(err)
//         return
//     }
//     onClientReady()
// })
//
// function onClientReady() {
//     client.ReadTodo({input: "Hello world"}, (err, res) => {
//         if (err) {
//             console.error(err)
//             return
//         }
//         console.log(res)
//     })
//     client.FindAll(new Empty(), (err, res) => {
//         console.log(res?.todos)
//     })
// }
