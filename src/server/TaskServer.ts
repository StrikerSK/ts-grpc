// @ts-ignore
import path from "path";
import * as grpc from '@grpc/grpc-js'
import {grpcObject, GRPC_PORT, GRPC_URL} from "../Utils";
import {TaskServiceHandlers} from "../commons/proto/task/task/TaskService";
import {createTask, deleteTask, readTasks, readTask, updateTask} from './repository/LocalRepository'

function main() {
    const server = getServer()

    server.bindAsync(GRPC_URL, grpc.ServerCredentials.createInsecure(), (err, port) => {
        if (err) {
            console.log(err)
            return
        }
        console.log(`Running server on ${GRPC_PORT}`)
        server.start()
    })
}

function getServer() {
    const server = new grpc.Server()
    server.addService(grpcObject.task.TaskService.service, {
        "ReadTask": (req, res) => {
            res(null, readTask(req.request))
        },
        "CreateTask": (req, res) => {
            res(null, createTask(req.request))
        },
        "UpdateTask": (req, res) => {
            res(null, updateTask(req.request))
        },
        "ReadTasks": (req, res) => {
            res(null, readTasks())
        },
        "DeleteTask": (req, res) => {
            res(null, deleteTask(req.request))
        },
    } as TaskServiceHandlers)

    return server
}

main()