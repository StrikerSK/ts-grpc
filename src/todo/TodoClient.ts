import * as grpc from "grpc";
import { PORT } from "../Utils";
import {NewTodo, IdRequest, PersistedTodo} from "../proto/todo/todo_pb";
import {TodoServiceClient} from "../proto/todo/todo_grpc_pb";
import * as emptyPB from "google-protobuf/google/protobuf/empty_pb";

const client = new TodoServiceClient(
    `localhost:${PORT}`,
    grpc.credentials.createInsecure(),
);

function CreateTodo(): Promise<IdRequest> {
    return new Promise<IdRequest>((resolve, reject) => {
        client.createTodo(new NewTodo().setName("First Todo").setDescription("Desc of todo"), (err, res) => {
            if (err) {
                console.log(err);
                reject(err);
            }

            console.log(`Todo id: ${res.getId()}`);
            resolve(res);
        });
    });
}

function GetTodo(id: string): Promise<PersistedTodo> {
    return new Promise<PersistedTodo>((resolve, reject) => {
        client.getTodo(new IdRequest().setId(id), (err, res) => {
            if (err) {
                console.log(err);
                reject(err);
            }

            console.log(`Persisted todo: ${res}`);
            resolve(res);
        });
    });
}

async function GetTodos(): Promise<PersistedTodo[]> {
    return new Promise<PersistedTodo[]>((resolve, reject) => {
        const stream = client.getTodos(new emptyPB.Empty());

        // Iterator over incoming data
        stream.on('data', (todo: PersistedTodo) => {
            console.log(`${todo.getName()}: ${todo.getDescription()}`);
        });

        stream.on('end', resolve);
        stream.on('error', reject);
    });
}

GetTodos().then(item => console.log(JSON.stringify(item))).catch(item => console.log(item))
// GetTodo("d42940ed-5861-49b6-82be-04058b72efab")
// CreateTodo().then(id => GetTodo(id.getId()))