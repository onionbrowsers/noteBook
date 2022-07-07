import React from 'react'
import {useParams, useSearchParams, useLocation} from 'react-router-dom'
// import qs from 'qs'

const data = [
    {
        id: 1, content: '1111'
    },
    {
        id: 2, content: '2222'
    },
    {
        id: 3, content: '3333'
    }
]

export default function Detail() {
    /**
     * params传参，动态参数
     */
    // const params = useParams()
    // const item = data[params.id - 1]
    /**
     * query传参
     */
    // const [query] = useSearchParams()
    // const id = query.get('id')
    // const title = query.get('title')
    // const item = data[id - 1]
    /**
     * state传参
     */
    const {state} = useLocation()
    const item = data[state.id - 1]
    return (
        <div>
            {/* <ul>
                <li>ID: {params.id}</li>
                <li>TITLE: {params.title}</li>
                <li>CONTENT: {item ? item.content : ''}</li>
            </ul> */}
            {/* <ul>
                <li>ID: {id}</li>
                <li>TITLE: {title}</li>
                <li>CONTENT: {item ? item.content : ''}</li>
            </ul> */}
            <ul>
                <li>ID: {state.id}</li>
                <li>TITLE: {state.title}</li>
                <li>CONTENT: {item ? item.content : ''}</li>
            </ul>
        </div>
    )
}
