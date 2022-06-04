import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addPerson } from '../../redux/actions/person'

export class Person extends Component {
    state = {
        count: 0
    }
    add() {
        const name = this.nameNode.value
        const age = this.ageNode.value
        const {count} = this.state
        const personObj = {
            id: count,
            name,
            age
        }
        this.setState({
            count: count + 1
        })
        this.nameNode.value = ''
        this.ageNode.value = ''
        this.props.addPerson(personObj)
    }
    render() {
        const {personList} = this.props
        return (
            <div>
                <h2>person组件</h2>
                <input ref={c => this.nameNode = c} type="text" name="username" id="" />
                <input ref={c => this.ageNode = c} type="text" name="age" id="" />
                <button onClick={this.add.bind(this)}>添加</button>
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

const mapStateToProps = (state) => ({
    personList: state.personList
})

const mapDispatchToProps = {
    addPerson
}

export default connect(mapStateToProps, mapDispatchToProps)(Person)