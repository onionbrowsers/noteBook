import { ADD } from "../constant";

export const addPerson = (personObj) => ({
    type: ADD,
    data: personObj
})