import * as grpc from "grpc"
import {PORT} from "../Utils";
import { v4 as uuidv4 } from "uuid";
import {ITodoServiceServer, TodoServiceService} from "../proto/todo/todo_grpc_pb";
import {IdRequest, NewTodo, PersistedTodo} from "../proto/todo/todo_pb";
import {sendUnaryData, ServerUnaryCall, ServerWritableStream} from "grpc";
import * as emptyPB from "google-protobuf/google/protobuf/empty_pb";

const test = emptyPB.Empty
const todos: Array<PersistedTodo> = [];

class TodoServerImpl implements ITodoServiceServer {
    createTodo(call: ServerUnaryCall<NewTodo>, callback: sendUnaryData<IdRequest>): void {
        const request = call.request;
        const uniqueID = uuidv4();

        const newTodo: PersistedTodo = new PersistedTodo();
        newTodo
            .setId(uniqueID)
            .setName(request.getName())
            .setDescription(request.getDescription())
            .setDone(request.getDone())

        todos.push(newTodo);
        console.log(`Create Todo: ${uniqueID}`);
        callback(null, new IdRequest().setId(uniqueID))
    }


    getTodo(call: ServerUnaryCall<IdRequest>, callback: sendUnaryData<PersistedTodo>): void {
        const searchID = call.request.getId();
        const persistedTodo = todos.find(item => item.getId() == searchID);
        console.log(persistedTodo);

        if (persistedTodo) {
            console.log(persistedTodo);
            callback(null, persistedTodo);
        } else {
            console.log(`Item [${searchID}] could not be found!`)
        }
    }

    getTodos(call: ServerWritableStream<emptyPB.Empty, PersistedTodo>): void {
        for (const todo of todos) {
            call.write(todo);
        }
        call.end();
    }
}

function main() {
    const server = new grpc.Server();
    server.addService<ITodoServiceServer>(TodoServiceService, new TodoServerImpl());

    console.log(`Listening on ${PORT}`);

    server.bind(`localhost:${PORT}`, grpc.ServerCredentials.createInsecure());
    server.start();
}

main();