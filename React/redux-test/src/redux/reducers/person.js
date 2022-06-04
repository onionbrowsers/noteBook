import { ADD } from "../constant";

export default function addPersonReducer(prestate = [], action) {
    const {type, data} = action
    switch (type) {
        case ADD: 
            return [data, ...prestate]
        default: 
            return prestate
    }
}