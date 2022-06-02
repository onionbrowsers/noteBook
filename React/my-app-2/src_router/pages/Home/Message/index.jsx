import React, { Component } from 'react'
import Detail from './Detail'
import {Link, Route} from 'react-router-dom'

export default class Message extends Component {
    state = {
        messageArr: [
            {id: 1, title: '消息1'},
            {id: 2, title: '消息2'},
            {id: 3, title: '消息3'}
        ]
    }

    clickMessage(message) {
        // this.props.history.push({
        //     pathname: `/home/messages/detail/${message.id}/${message.title}`,
        // })
        this.props.history.push({
            pathname: `/home/messages/detail`,
            search: `id=${message.id}&title=${message.title}`
        })
        // this.props.history.push({
        //     pathname: `/home/messages/detail`,
        //     state: {
        //         id: message.id,
        //         title: message.title
        //     }
        // })
    }

    render() {
        return (
            <div>
                <ul>
                    {
                        this.state.messageArr.map(message => {
                            return (
                                <li key={message.id}>
                                    {/* params 传参测试 */}
                                    <span onClick={this.clickMessage.bind(this, message)} to={`/home/messages/detail/${message.id}/${message.title}`} >
                                        {message.title}
                                    </span>
                                    {/* <br /> */}
                                    {/* query传参测试 */}
                                    {/* <Link to={`/home/messages/detail?id=${message.id}&title=${message.title}`} >
                                        {message.title}
                                    </Link>
                                    <br /> */}
                                    {/* state传参测试 */}
                                    {/* <Link to={{pathname: '/home/messages/detail', state: {
                                        id: message.id,
                                        title: message.title
                                    }}} >
                                        {message.title}
                                    </Link> */}
                                </li>
                            )
                        })
                    }
                </ul>
                <hr />
                {/* <Route path="/home/messages/detail/:id/:title" component={Detail}></Route> */}
                <Route path="/home/messages/detail" component={Detail}></Route>
                {/* <Route path="/home/messages/detail" component={Detail}></Route> */}
            </div>
        )
    }
}
