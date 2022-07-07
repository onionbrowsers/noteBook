import React, { useState } from 'react'
import {Link, Outlet, useNavigate} from 'react-router-dom'

export default function Message(props) {
    const [messageArr] = useState([
        {id: 1, title: '消息1'},
        {id: 2, title: '消息2'},
        {id: 3, title: '消息3'}
    ])

    const navigate = useNavigate()
    console.log(navigate)
    function clickMessage(message) {
        console.log(message)
        navigate('detail', {
            state: {
                id: message.id,
                title: message.title
            }
        })
        // props.history.push({
        //     pathname: `/home/messages/detail/${message.id}/${message.title}`,
        // })
        // props.history.push({
        //     pathname: `/home/messages/detail`,
        //     search: `id=${message.id}&title=${message.title}`
        // })
        // props.history.push({
        //     pathname: `/home/messages/detail`,
        //     state: {
        //         id: message.id,
        //         title: message.title
        //     }
        // })
    }

    return (
        <div>
            <ul>
                {
                    messageArr.map(message => {
                        return (
                            <li key={message.id}>
                                {/* params 传参测试 */}
                                {/* <Link to={`detail/${message.id}/${message.title}`} >
                                    {message.title}
                                </Link>
                                <br /> */}
                                {/* query传参测试 */}
                                {/* <Link to={`/home/messages/detail?id=${message.id}&title=${message.title}`} >
                                    {message.title}
                                </Link>
                                <br /> */}
                                {/* state传参测试 */}
                                <Link to={'/home/messages/detail'} state={ {
                                    id: message.id,
                                    title: message.title
                                } } >
                                    {message.title}
                                </Link>
                                <button onClick={() => clickMessage(message)}>查看详情</button>
                            </li>
                        )
                    })
                }
            </ul>
            <hr />
            <Outlet></Outlet>
        </div>
    )
}
