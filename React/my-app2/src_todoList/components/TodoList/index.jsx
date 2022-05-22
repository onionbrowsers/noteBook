import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TodoListModule from './index.module.css'
import TodoItem from '../TodoItem'
import Confirm from '../Confirm'

export default class TodoList extends Component {

    static propTypes = {
        todoList: PropTypes.array.isRequired,
        deleteItem: PropTypes.func.isRequired,
        checkItem: PropTypes.func.isRequired
    }

    state = {
        showConfirm: false,
        curItem: null
    }
    
    deleteItem(item) {
        this.setState({
            curItem: item,
            showConfirm: true
        })
    }

    confirmDelete() {
        const {curItem} = this.state
        if (!curItem) return
        this.props.deleteItem(curItem)
        this.setState({
            showConfirm: false,
            curItem: null
        })
    }

    cancelDelete() {
        this.setState({
            showConfirm: false,
            curItem: null
        })
    }

    render() {
        const {showConfirm} = this.state
        const {todoList = []} = this.props

        return (
            <div className={TodoListModule['todo-list']}>
                {
                    todoList.length ? this.getListContent(todoList) : <div className={TodoListModule['no-data']}>没有数据</div>
                }
                {
                    showConfirm ? 
                        <Confirm
                            confirmDelete={this.confirmDelete.bind(this)}
                            cancelDelete={this.cancelDelete.bind(this)}
                        >
                        </Confirm> : 
                        ''
                }
            </div>
        )
    }

    getListContent(list) {
        return list.map(item => {
            return (
                <React.Fragment key={item.id}>
                    {/* props放在前面被后面面的覆盖 */}
                    <TodoItem {...this.props} deleteItem={this.deleteItem.bind(this)} item={item}></TodoItem>
                </React.Fragment>
            )
        })
    }
}
