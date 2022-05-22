import {Component} from 'react'
import Hello from './components/Hello'
import Welcome from './components/Welcome'
import Thanks from './components/Thanks'

class App extends Component {
	render() {
		return (
			<div>
				<Hello />
				<Welcome />
				<Thanks />
			</div>
		)
	}
}

export default App
