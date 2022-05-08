// @ts-ignore
import path from "path";
import * as grpc from '@grpc/grpc-js'
import {grpcObject, PORT} from "../Utils";
import {TodoServiceHandlers} from "../proto/todo/todo/TodoService";
import {createTodo, deleteTodo, findAll, readTodo, updateTodo} from './repository/LocalRepository'

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
    server.addService(grpcObject.todo.TodoService.service, {
        "ReadTodo": (req, res) => {
            res(null, readTodo(req.request))
        },
        "CreateTodo": (req, res) => {
            res(null, createTodo(req.request))
        },
        "UpdateTodo": (req, res) => {
            res(null, updateTodo(req.request))
        },
        "FindAll": (req, res) => {
            res(null, findAll())
        },
        "DeleteTodo": (req, res) => {
            res(null, deleteTodo(req.request))
        },
    } as TodoServiceHandlers)

    return server
}

main()