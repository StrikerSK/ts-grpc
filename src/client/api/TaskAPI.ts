import express from 'express';
import GrpcClient from "../config/TaskGrpcClient";
import {Empty} from "google-protobuf/google/protobuf/empty_pb";

const router = express.Router()

router.post('/', (req: any, res: any) => {
    const { body } = req;

    GrpcClient.CreateTask(body, (err, response) => {
        res.send({data: response})
    });
});

router.get('/:taskID', (req: any, res: any) => {
    GrpcClient.ReadTask({id: req.params.taskID}, (err, response) => {
        if (err) {
            console.log(err.code)
        }

        res.send(response);
    })
});

router.get('/', (req: any, res: any) => {
    GrpcClient.ReadTasks(new Empty(), (err, response) => {
        res.send(response);
    })
});

router.put('/:taskID', (req: any, res: any) => {
    const { body, params: {taskID} } = req;
    body.id = taskID;
    GrpcClient.UpdateTask(body, (err, response) => {
        if (err) {
            res.sendStatus(500);
        }

        res.sendStatus(200);
    })
});

router.delete('/:taskID', (req: any, res: any) => {
    GrpcClient.DeleteTask({id: req.params.taskID}, (err, response) => {
        res.sendStatus(200);
    })
});

export default router

