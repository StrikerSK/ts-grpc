import {CustomTodo, CustomTodo__Output} from '../../../proto/todo/CustomTodo'
import  * as uuid from 'uuid'
import {StringResponse} from "../../../proto/todo/StringResponse";
import {StringRequest__Output} from "../../../proto/todo/StringRequest";
import {TodoArray} from "../../../proto/todo/TodoArray";

export const createTodo = (input: CustomTodo__Output): StringResponse => {
    console.log("User provided data to create: ", input);
    return {
        output: uuid.v4()
    }
}

export const updateTodo = (input: CustomTodo): StringResponse => {
    console.log("User provided updated data: ", input);
    return {
        output: `Data for [${input.id}] updated`
    }
}

export const readTodo = (input: StringRequest__Output): CustomTodo => {
    console.log(`User is reading data for id [${input.input}]`)
    return {
        name: "Task",
        description: "Task coming from TypeScript",
        done: false,
        id: input.input
    }
}

export const findAll = (): TodoArray => {
    console.log(`User is fetching all data`)
    return {
        todos: [
            {
                name: "Task 1",
                description: "Task 1 coming from TypeScript",
                done: false,
                id: uuid.v4()
            },
            {
                name: "Task 2",
                description: "Task 2 coming from TypeScript",
                done: false,
                id: uuid.v4()
            }
        ]
    }
}

export const deleteTodo = (input: StringRequest__Output): StringResponse => {
    console.log(`User is deleting data for id [${input.input}]`)
    return {
        output: `Data for [${input.input}] deleted`
    }
}

