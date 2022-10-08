import * as grpc from '@grpc/grpc-js'
import {GRPC_PORT, GRPC_URL, grpcObject} from "../../commons/Utils";
import {TaskServiceHandlers} from "../../commons/proto/task/task/TaskService";
import ITaskRepository from "../repository/ITaskRepository";
import {Status} from "@grpc/grpc-js/build/src/constants";

export default class {
    private server: grpc.Server
    private repository: ITaskRepository

    constructor(repository: ITaskRepository) {
        this.server = new grpc.Server()
        this.repository = repository
        this.server.addService(grpcObject.task.TaskService.service, {
            "ReadTask": (req, res) => {
                const task = this.repository.readTask(req.request)

                if (!task) {
                    res({
                        code: Status.NOT_FOUND,
                        message: "Task not found"
                    }, null)
                } else {
                    res(null, task)
                }
            },
            "CreateTask": (req, res) => {
                res(null, this.repository.createTask(req.request))
            },
            "UpdateTask": (req, res) => {
                res(null, this.repository.updateTask(req.request))
            },
            "ReadTasks": (req, res) => {
                res(null, this.repository.readTasks())
            },
            "DeleteTask": (req, res) => {
                res(null, this.repository.deleteTask(req.request))
            },
        } as TaskServiceHandlers)
    }

    public start() {
        this.server.bindAsync(GRPC_URL, grpc.ServerCredentials.createInsecure(), (err, port) => {
            if (err) {
                console.log(err)
                return
            }
            console.log(`Running server on ${GRPC_PORT}`)
            this.server.start()
        })
    }
}