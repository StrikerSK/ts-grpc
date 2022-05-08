import {Empty} from "google-protobuf/google/protobuf/empty_pb";
const express = require('express');
const bodyParser = require('body-parser');
import { client } from "./client/TodoClient";

const app = express();
const SERVER_PORT = 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get( "/", ( req: any, res: any ) => {
    res.send("Hello from Node server!");
} );

app.post('/api/todo', (req: any, res: any) => {
    const { body } = req;

    client.CreateTodo(body, (err, response) => {
        res.send({data: response?.output})
    });
});

app.get('/api/todo/:todoID', (req: any, res: any) => {
    client.ReadTodo({input: req.params.todoID}, (err, response) => {
        res.send(response);
    })
});

app.get('/api/todo', (req: any, res: any) => {
    client.FindAll(new Empty(), (err, response) => {
        res.send(response?.todos);
    })
});

app.delete('/api/todo', (req: any, res: any) => {
    client.DeleteTodo({input: req.params.todoID}, (err, response) => {
        res.sendStatus(200);
    })
});

// start the Express server
app.listen( SERVER_PORT, () => {
    console.log( `Server started at http://localhost:${ SERVER_PORT }` );
} );
