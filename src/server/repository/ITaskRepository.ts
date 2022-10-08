import {Task, } from "../../commons/proto/task/task/Task";
import {TaskRequest} from "../../commons/proto/task/task/TaskRequest";
import {Empty} from "../../commons/proto/task/task/Empty";
import {TaskList} from "../../commons/proto/task/task/TaskList";

export default interface ITaskRepository {
    createTask(input: Task): TaskRequest
    readTask(input: TaskRequest): Task | undefined
    readTasks(): TaskList
    updateTask (input: Task): Empty
    deleteTask(input: TaskRequest): Empty
}