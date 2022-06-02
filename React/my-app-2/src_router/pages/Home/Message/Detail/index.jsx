import React, { Component } from 'react'
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

export default class Detail extends Component {
    render() {
        const {match: {params = {}}, location: {search = '', state = {}}} = this.props
        const item = data[params.id - 1]
        // const obj = qs.parse(search.substr(1))
        // const item = data[obj.id - 1]
        // const item = data[state.id - 1]
        return (
            <div>
                <ul>
                    <li>ID: {params.id}</li>
                    <li>TITLE: {params.title}</li>
                    <li>CONTENT: {item ? item.content : ''}</li>
                </ul>
                {/* <ul>
                    <li>ID: {obj.id}</li>
                    <li>TITLE: {obj.title}</li>
                    <li>CONTENT: {item ? item.content : ''}</li>
                </ul> */}
                {/* <ul>
                    <li>ID: {state.id}</li>
                    <li>TITLE: {state.title}</li>
                    <li>CONTENT: {item ? item.content : ''}</li>
                </ul> */}
            </div>
        )
    }
}
