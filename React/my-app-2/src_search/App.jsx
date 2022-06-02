import { Component } from 'react'

import Search from './components/Search'
import List from './components/List'


class App extends Component {

	state = {
		users: [],
		isFirst: true,
		isLoading: false,
		err: null
	}

	updateAppState(stateObj) {
		this.setState(stateObj)
	}

	render() {
		return (
			<div className="container">
				<Search updateAppState={this.updateAppState.bind(this)}></Search>
				<List {...this.state}></List>
			</div>
		)
	}
}

export default App
