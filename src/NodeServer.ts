import {PersistedTodo} from "./proto/todo/todo_pb";

const express = require('express');
const bodyParser = require('body-parser');

import {CreateTodo, GetTodo, GetTodos} from "./todo/TodoClient";

const app = express();
const SERVER_PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get( "/", ( req: any, res: any ) => {
    res.send("Hello from Node server!");
} );

app.post('/todo', (req: any, res: any) => {
    const { body } = req;

    CreateTodo(body.name, body.description, body.done)
        .then(response => res.json({data: response.getId()}))
        .catch(err => console.log(err))
});

app.get('/todo/:todoID', (req: any, res: any) => {
    const { body } = req;

    GetTodo(req.params.todoID)
        .then(response => res.json(
            {
                todo: {
                    name: response.getName(),
                    description: response.getDescription(),
                    done: response.getDone()
                }
            }
        ))
        .catch(err => console.log(err))
});

app.get('/todo', (req: any, res: any) => {
    const { body } = req;

    GetTodos()
        .then(item => res.json(collectData(item)))
        .catch(err => console.log(err))

    function collectData(inputData: PersistedTodo[]) {
        return inputData.map(item => {
            return {
                name: item.getName(),
                description: item.getDescription(),
                done: item.getDone()
            }
        })
    }
});

// start the Express server
app.listen( SERVER_PORT, () => {
    console.log( `Server started at http://localhost:${ SERVER_PORT }` );
} );
