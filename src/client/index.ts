import TaskAPI from "./api/TaskAPI";
const express = require('express');

const app = express();
const SERVER_PORT = 8080;

app.use(express.json())
app.use(express.urlencoded())

app.use("/api/task", TaskAPI)

// start the Express server
app.listen( SERVER_PORT, () => {
    console.log( `Server started at http://localhost:${ SERVER_PORT }` );
} );
