// @ts-ignore
import path from "path";
import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import {ProtoGrpcType} from "../proto/todo/todo";
import { PORT } from "../Utils";
import {Empty} from "google-protobuf/google/protobuf/empty_pb";

const PROTO_FILE = '../../proto/todo.proto'

const packageDef = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE))
const grpcObject = (grpc.loadPackageDefinition(packageDef) as unknown) as ProtoGrpcType

const client = new grpcObject.todo.TodoService(
    `0.0.0.0:${PORT}`, grpc.credentials.createInsecure()
)

const deadline = new Date()
deadline.setSeconds(deadline.getSeconds() + 5)
client.waitForReady(deadline, (err) => {
    if (err) {
        console.error(err)
        return
    }
    onClientReady()
})

function onClientReady() {
    client.ReadTodo({input: "Hello world"}, (err, res) => {
        if (err) {
            console.error(err)
            return
        }
        console.log(res)
    })
    client.FindAll(new Empty(), (err, res) => {
        console.log(res?.todos)
    })
}