import * as grpc from "grpc";
import { PORT } from "../Utils";
import {NewTodo, IdRequest, PersistedTodo} from "../proto/todo/todo_pb";
import {TodoServiceClient} from "../proto/todo/todo_grpc_pb";

const client = new TodoServiceClient(
    `localhost:${PORT}`,
    grpc.credentials.createInsecure(),
);

function CreateTodo(): Promise<IdRequest> {
    return new Promise<IdRequest>((resolve, reject) => {
        client.createTodo(new NewTodo().setName("First Todo").setDescription("Desc of todo"), (err, res) => {
            if (err) {
                console.log(err);
            }

            console.log(`Todo id: ${res.getId()}`);
        });
    });
}

function GetTodo(id: string): Promise<PersistedTodo> {
    return new Promise<PersistedTodo>((resolve, reject) => {
        client.getTodo(new IdRequest().setId(id), (err, res) => {
            if (err) {
                console.log(err);
            }

            console.log(`Todo id: ${res.getId()}`);
        });
    });
}
