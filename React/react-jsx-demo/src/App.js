import './index.css'
import avatar from './images/avatar.png'
import React, { useState } from 'react'
import TestTable from './components/TestTable'
// 依赖的数据
const state = {
    // hot: 热度排序  time: 时间排序
    tabs: [
        {
            id: 1,
            name: '热度',
            type: 'hot'
        },
        {
            id: 2,
            name: '时间',
            type: 'time'
        }
    ],
    active: 'hot',
    list: [
        {
            id: 1,
            author: '刘德华',
            comment: '给我一杯忘情水',
            time: new Date('2021-10-10 09:09:00'),
            // 1: 点赞 0：无态度 -1:踩
            attitude: 1
        },
        {
            id: 2,
            author: '周杰伦',
            comment: '哎哟，不错哦',
            time: new Date('2021-06-11 09:09:00'),
            // 1: 点赞 0：无态度 -1:踩
            attitude: 0
        },
        {
            id: 3,
            author: '五月天',
            comment: '不打扰，是我的温柔',
            time: new Date('2021-10-11 10:09:00'),
            // 1: 点赞 0：无态度 -1:踩
            attitude: -1
        }
    ]
}

function formatTime(time = new Date()) {
    const padStart = String.prototype.padStart
    const year = time.getFullYear()
    const month = padStart.call(time.getMonth() + 1, 2, '0')
    const day = padStart.call(time.getDate(), 2, '0')
    return `${year}-${month}-${day}`
}

function App() {
    const [activeTab, setActiveTab] = React.useState('hot')

    function clickTab(tab) {
        setActiveTab(tab.type)
    }

    return (
        <div className="App">
            <div className="comment-container">
                {/* 评论数 */}
                <div className="comment-head">
                    <span>{state.list.length} 评论</span>
                </div>
                {/* 排序 */}
                <div className="tabs-order">
                    <ul className="sort-container">
                        {
                            state.tabs.map(item => {
                                return (
                                    <li
                                        onClick={() => clickTab(item)}
                                        key={item.id}
                                        className={activeTab === item.type ? 'on' : ''}>
                                        按{item.name}排序
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>

                {/* 添加评论 */}
                <div className="comment-send">
                    <div className="user-face">
                        <img className="user-head" src={avatar} alt="" />
                    </div>
                    <div className="textarea-container">
                        <textarea
                            cols="80"
                            rows="5"
                            placeholder="发条友善的评论"
                            className="ipt-txt"
                        />
                        <button className="comment-submit">发表评论</button>
                    </div>
                    <div className="comment-emoji">
                        <i className="face"></i>
                        <span className="text">表情</span>
                    </div>
                </div>

                {/* 评论列表 */}
                <div className="comment-list">
                    {state.list.map(item => {
                        return (
                            <div key={item.id} className="list-item">
                                <div className="user-face">
                                    <img className="user-head" src={avatar} alt="" />
                                </div>
                                <div className="comment">
                                    <div className="user">{item.author}</div>
                                    <p className="text">{item.comment}</p>
                                    <div className="info">
                                        <span className="time">{formatTime(item.time)}</span>
                                        <span className={item.attitude === 1 ? 'like liked' : 'like'}>
                                            <i className="icon" />
                                        </span>
                                        <span className={item.attitude === -1 ? 'hate hated' : 'hate'}>
                                            <i className="icon" />
                                        </span>
                                        <span className="reply btn-hover">删除</span>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <TestTable></TestTable>
        </div>
    )
}


export default App
