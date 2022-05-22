import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TodoItemModule from './index.module.css'

export default class TodoItem extends Component {

    static propTypes = {
        deleteItem: PropTypes.func.isRequired,
        checkItem: PropTypes.func.isRequired
    }

    state = {
        showConfirm: false
    }

    deleteItem(item) {
        this.props.deleteItem(item)
    }

    changeCheck(item, event) {
        this.props.checkItem( item, event.target.checked )
    }

    render() {
        const {item} = this.props
        return (
            <div key={item.id} className={TodoItemModule['list-item']}>
                <input checked={item.checked} onChange={this.changeCheck.bind(this, item)} className={TodoItemModule['check-content']} type="checkbox" name="checkList" />
                <span className={TodoItemModule['list-item-content']}>
                    {item.name}
                </span>
                <button onClick={this.deleteItem.bind(this, item)} className={TodoItemModule['list-button']}>
                    删除
                </button>
            </div>
        )
    }
}
