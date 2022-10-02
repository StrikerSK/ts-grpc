import  * as uuid from 'uuid'
import {Task } from "../../commons/proto/task/task/Task";
import {TaskRequest} from "../../commons/proto/task/task/TaskRequest";
import {TaskList} from "../../commons/proto/task/task/TaskList";
import {Empty} from "../../commons/proto/task/task/Empty";

export const createTask = (input: Task): TaskRequest => {
    console.log("User provided data to create: ", input);
    return {
        id: uuid.v4()
    }
}

export const readTask = (input: TaskRequest): Task => {
    console.log(`User is reading data for id [${input.id}]`)
    return {
        name: "Task",
        description: "Task coming from TypeScript",
        done: false,
        id: input.id
    }
}

export const readTasks = (): TaskList => {
    console.log(`User is fetching all data`)
    return {
        tasks: [
            {
                name: "Task 1",
                description: "Task 1 coming from TypeScript",
                done: false,
                id: uuid.v4(),
                tags: ["tag1", "tag2"]
            },
            {
                name: "Task 2",
                description: "Task 2 coming from TypeScript",
                done: false,
                id: uuid.v4(),
                tags: ["tag1", "tag2"]
            }
        ]
    }
}

export const updateTask = (input: Task): Empty => {
    console.log("User provided updated data: ", input);
    return {}
}

export const deleteTask = (input: TaskRequest): Empty => {
    console.log(`User is deleting data for id [${input.id}]`)
    return {}
}

