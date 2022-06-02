import React, { Component } from 'react'
import axios from 'axios';

export default class Search extends Component {
    state = {
        timer: null
    }
    search() {
        const { timer } = this.state
        clearInterval(timer)
        const newTimer = setTimeout(() => {
            const { value: keyword } = this.keyWordNode
            this.props.updateAppState({
                isFirst: false,
                isLoading: true
            })
            axios.get('/api1/search/users', {
                params: {
                    q: keyword
                }
            }).then(res => {
                this.props.updateAppState({
                    isFirst: false,
                    isLoading: false,
                    users: res.data.items
                })
            }).catch(err => {
                this.props.updateAppState({
                    isLoading: false,
                    isFirst: false,
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
