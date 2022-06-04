import React, { Component } from 'react'
import Count from './containers/Count'
import {connect} from 'react-redux'
import Person from './containers/Person'


export class App extends Component {
    render() {
        const {count, personList} = this.props
        return (
            <div>
                <Count></Count>
                <hr />
                <Person></Person>
                <hr />
                <div>
                    {count}
                </div>
                <hr />
                <ul>
                    {
                        personList.map(person => {
                            return (
                                <li key={person.id}>
                                    叫{person.name} --- {person.age}岁
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default connect(state => ({
    count: state.count,
    personList: state.personList
}))(App)
