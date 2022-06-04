import count from "./count";
import personList from "./person";
import {combineReducers} from 'redux'

export default combineReducers({
    count,
    personList
})