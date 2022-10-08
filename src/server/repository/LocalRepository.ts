import * as uuid from 'uuid'
import {Task} from "../../commons/proto/task/task/Task";
import {TaskRequest} from "../../commons/proto/task/task/TaskRequest";
import {Empty} from "../../commons/proto/task/task/Empty";
import ITaskRepository from "./ITaskRepository";
import {TaskList} from "../../commons/proto/task/task/TaskList";

export default class implements ITaskRepository {
    private tasks: Task[] = []

    createTask(input: Task): TaskRequest {
        input.id = uuid.v4()
        this.tasks.push(input);

        return {
            id: input.id
        }
    }

    readTask(input: TaskRequest): Task | undefined {
        return this.tasks.find(task => task.id === input.id)
    }

    readTasks(): TaskList {
        return {
            tasks: this.tasks
        }
    }

    updateTask(input: Task): Empty {
        const index = this.tasks.findIndex(task => task.id === input.id)
        this.tasks[index] = input
        return {} ;
    }

    deleteTask(input: TaskRequest): Empty {
        const index = this.tasks.findIndex(task => task.id === input.id)
        this.tasks.splice(index, 1)
        return {};
    }
}

