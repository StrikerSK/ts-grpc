import * as grpc from "grpc";
import { PORT } from "../Utils";
import {NewTodo, IdRequest, PersistedTodo} from "../proto/todo/todo_pb";
import {TodoServiceClient} from "../proto/todo/todo_grpc_pb";
import * as emptyPB from "google-protobuf/google/protobuf/empty_pb";

const client = new TodoServiceClient(
    `localhost:${PORT}`,
    grpc.credentials.createInsecure(),
);

export function CreateTodo(name: string, description: string, done: boolean): Promise<IdRequest> {
    return new Promise<IdRequest>((resolve, reject) => {
        const newTodo = new NewTodo()
            .setName(name)
            .setDescription(description)
            .setDone(done)

        client.createTodo(newTodo, (err, res) => {
            if (err) {
                console.log(err);
                reject(err);
            }

            console.log(`Created Todo ID: ${res.getId()}`);
            resolve(res);
        });
    });
}

export function GetTodo(id: string): Promise<PersistedTodo> {
    return new Promise<PersistedTodo>((resolve, reject) => {
        client.getTodo(new IdRequest().setId(id), (err, res) => {
            if (err) {
                console.log(err);
                reject(err);
            }

            console.log(`Get Todo: ${res}`);
            resolve(res);
        });
    });
}

export function GetTodos(): Promise<PersistedTodo[]> {
    return new Promise<PersistedTodo[]>((resolve, reject) => {
        const stream = client.getTodos(new emptyPB.Empty());
        const tempArr: PersistedTodo[] = [];

        // Iterator over incoming data
        stream.on('data', (todo: PersistedTodo) => {
            tempArr.push(new PersistedTodo().setName(todo.getName()).setDescription(todo.getDescription()).setDone(todo.getDone()))
        });

        stream.on("end", () => resolve(tempArr));
    });
}