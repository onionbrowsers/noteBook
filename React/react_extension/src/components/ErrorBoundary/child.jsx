import React, { Component } from 'react'

export default class Child extends Component {
    state = {
        // users: Array.from({length: 3}, (value, index) => ( {
        //     id: index,
        //     name: index + 'S',
        //     age: index + 18
        // } ) )
        users: ''
    }
    render() {
        return (
            <div>
                {
                    this.state.users.map(item => {
                        return (
                            <h4 key={item.id}>
                                {item.name} --- {item.age}
                            </h4>
                        )
                    })
                }
            </div>
        )
    }
}
