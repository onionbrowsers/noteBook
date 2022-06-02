import { Component } from 'react'

import Search from './components/Search'
import List from './components/List'


class App extends Component {
	render() {
		return (
			<div className="container">
				<Search></Search>
				<List></List>
			</div>
		)
	}
}

export default App
