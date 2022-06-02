import React, { Component } from 'react'
import './index.css'

export default class List extends Component {
    render() {
        const {users, isFirst, isLoading, err} = this.props
        console.log(this.props)
        return (
            <div className="row">
                {
                    isFirst ? <h2>请搜索……</h2> :
                    isLoading ? <h2>加载中……</h2> :
                    err ? <h2>{err.message}</h2> :
                    this.mapUserList(users)
                }
            </div>
        )
    }
    mapUserList(users) {
        return users.map(item => {
            return (
                <div key={item.id} className="card">
                    <a rel='noreferrer' href={item.html_url} target="_blank">
                        <img alt='' src={item.avatar_url} style={{ width: '100px' }} />
                    </a>
                    <p className="card-text">
                        {item.login}
                    </p>
                </div>
            )
        })
    }
}
