import {Task} from "../../commons/proto/task/task/Task";
import {TaskRequest} from "../../commons/proto/task/task/TaskRequest";
import * as uuid from "uuid";
import {TaskList} from "../../commons/proto/task/task/TaskList";
import {Empty} from "../../commons/proto/task/task/Empty";
import ITaskRepository from "./ITaskRepository";

export default class implements ITaskRepository {
    createTask = (input: Task): TaskRequest => {
        console.log("User provided data to create: ", input);
        return {
            id: uuid.v4()
        }
    }

    readTask = (input: TaskRequest): Task => {
        console.log(`User is reading data for id [${input.id}]`)
        return {
            name: "Task",
            description: "Task coming from TypeScript",
            done: false,
            id: input.id
        }
    }

    readTasks = (): TaskList => {
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

    updateTask = (input: Task): Empty => {
        console.log("User provided updated data: ", input);
        return {}
    }

    deleteTask = (input: TaskRequest): Empty => {
        console.log(`User is deleting data for id [${input.id}]`)
        return {}
    }
}