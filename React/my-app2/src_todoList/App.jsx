import React, {Component} from 'react'
import TodoList from './components/TodoList'
import TestInput from './components/TestInput'
import './App.css'

class App extends Component {
	testInputRef = null
	state = {
		checkAll: false,
		count: 3,
		todoList: [
			{
				name: '睡觉',
				id: 1,
				checked: false
			},
			{
				name: '学习',
				id: 2,
				checked: false
			}
		]
	}

	changeInput(val) {
		console.log(val)
	}

	_changeItem(todoList, query = {}) {
		const checkLength = todoList.filter(item => item.checked).length
		const checkAll = checkLength && checkLength === todoList.length
		const setQuery = {
			todoList,
			checkAll,
			...query
		}
		this.setState(setQuery)
	}

	deleteCheck() {
		if (window.confirm('确认删除选择选项么？')) {
			let todoList = this.state.todoList.filter(item => !item.checked)
			this._changeItem(todoList)
		}
	}

	deleteItem(deleteitem) {
		let todoList = this.state.todoList.slice()
		const index = todoList.findIndex(item => item.id === deleteitem.id)
		todoList.splice(index, 1)
		this._changeItem(todoList)
	}

	addItem(val) {
		console.log(this.testInputRef)
		let todoList = this.state.todoList.slice()
		let count = this.state.count
		todoList.unshift({
			name: val,
			id: count,
			checked: false
		})
		this._changeItem(todoList, {count: ++count})
	}

	checkItem(checkItem, checked) {
		let todoList = this.state.todoList.slice()
		const index = todoList.findIndex(item => item.id === checkItem.id)
		todoList[index].checked = checked
		this._changeItem(todoList)
	}

	checkAllFunc(event) {
		const {checked} = event.target
		let todoList = this.state.todoList.slice()
		todoList.forEach(item => item.checked = checked)
		this._changeItem(todoList)
	}

	render() {
		console.log(this.state, '---')

		const {todoList, checkAll} = this.state
		const checkLength = todoList.filter(item => item.checked).length

		// setTimeout(() => {
		// 	console.log(this.testInputRef)
		// }, 100)

		return (
			<div id='app'>
				<TestInput ref={ref => this.testInputRef = ref} addItem={this.addItem.bind(this)} onChange={this.changeInput.bind(this)} />
				<TodoList checkItem={this.checkItem.bind(this)} deleteItem={this.deleteItem.bind(this)} todoList={todoList} />
				<div className='total-wrapper'>
					{
						todoList.length ?
							<input className='check-all' onChange={this.checkAllFunc.bind(this)} type="checkbox" checked={checkAll}/> :
							''
					}
					<span className='check-count'>已选择{checkLength}条</span> / 共{todoList.length}条
					{
						checkLength ?
							<button onClick={this.deleteCheck.bind(this)} className='delete-button'>删除已选择项目</button> :
							''
					}
				</div>
			</div>
		)
	}
}

export default App
