// @ts-ignore
import path from "path";
import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import {ProtoGrpcType} from "../../proto/todo";
import { PORT } from "../Utils";
import {TodoServiceHandlers} from "../../proto/todo/TodoService";

const PROTO_FILE = '../../proto/todo.proto'

const packageDef = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE))
const grpcObject = (grpc.loadPackageDefinition(packageDef) as unknown) as ProtoGrpcType

const todoPackage = grpcObject.todo

function main() {
    const server = getServer()

    server.bindAsync(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
        if (err) {
            console.log(err)
            return
        }
        console.log(`Running server on ${PORT}`)
        server.start()
    })
}

function getServer() {
    const server = new grpc.Server()
    server.addService(todoPackage.TodoService.service, {
        "ReadTodo": (req, res) => {
            res(null, {id: "123", description: "Some task"})
        }
    } as TodoServiceHandlers)

    return server
}

main()