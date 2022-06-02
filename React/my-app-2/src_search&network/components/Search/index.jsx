import React, { Component } from 'react'
import axios from 'axios';
import PubSub from 'pubsub-js';

export default class Search extends Component {
    state = {
        timer: null
    }
    search() {
        const { timer } = this.state
        clearInterval(timer)
        const newTimer = setTimeout(async () => {
            const { value: keyword } = this.keyWordNode
            PubSub.publish('getList', {
                isFirst: false,
                isLoading: true
            })
            // try {
            //     const response = await fetch(`/api1/search/users?q=${keyword}`)
            //     const data = await response.json()
            //     PubSub.publish('getList', {
            //         isFirst: false,
            //         isLoading: false,
            //         users: data.items
            //     })
            // } catch (err) {
            //     console.log(err)
            //     PubSub.publish('getList', {
            //         isFirst: false,
            //         isLoading: false,
            //         err
            //     })
            // }
            axios.get('/api1/search/users', {
                params: {
                    q: keyword
                }
            }).then(res => {
                PubSub.publish('getList', {
                    isFirst: false,
                    isLoading: false,
                    users: res.data.items
                })
            }).catch(err => {
                PubSub.publish('getList', {
                    isFirst: false,
                    isLoading: false,
                    err
                })
            })
        }, 500)
        this.setState({
            timer: newTimer
        })
    }
    render() {
        return (
            <section className="jumbotron">
                <h3 className="jumbotron-heading">Search Github Users</h3>
                <div>
                    <input ref={ref => this.keyWordNode = ref} type="text" placeholder="enter the name you search" />
                    <button onClick={this.search.bind(this)}>Search</button>
                </div>
            </section>
        )
    }
}
