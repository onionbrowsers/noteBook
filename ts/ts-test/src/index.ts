import { StatusEnum } from './enums/index'

export type Result = {
    [key: string]: any
}

export interface promiseFunc {
    (onFulfilled: Function, onRejected: Function): MyPromise
}

export interface stateFunc {
    (val: any): void
}

class MyPromise {

    state: StatusEnum
    result: Result

    constructor() {
        this.state = StatusEnum.PENDING
        this.result = null
    }

    private transition(promise: this, state: StatusEnum, result: Result) {
        if (promise.state !== StatusEnum.PENDING) return
        promise.state = state
        promise.result = result
    }

    then(onFulfilled: stateFunc, onRejected: stateFunc): MyPromise {
        return this
    }
}

type Pick<T, K extends keyof T> = {
    [P in K]: T[P]
}

type Omit<T, K extends string | number | symbol> = {
    [P in Exclude<keyof T, K>]: T[P]
}

type Exclude<T, U> = T extends U ? never : T

interface Todo {
    title: string;
    description: string;
    completed: boolean;
    createdAt: number;
}

interface Test {
    title: string,
    description: number
}

type Merge = {
    
}

   
type TodoPreview = Omit<Todo, "description">;

const todo: TodoPreview = {
    title: "Clean room",
    completed: false,
    createdAt: 1615544252770,
};
