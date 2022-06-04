import { INCREMENT, DECREMENT } from "../constant"

/**
 * 同步action
 */
export const increment = (data) => ({
    type: INCREMENT,
    data
})

export const decrement = (data) => ({
    type: DECREMENT,
    data
})

/**
 * 异步action
 */
export const incrementAsync = (data, time) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(increment(data))
        }, time)
    }
}
