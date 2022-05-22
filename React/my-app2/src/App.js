import {Component} from 'react'
import axios from 'axios'

class App extends Component {
	getData() {
		axios.get('/api1/students').then(res => {
			console.log(res)
		})
	}

	getCarData() {
		axios.get('/api2/cars').then(res => {
			console.log(res)
		})
	}

	render() {
		return (
			<div>
				<button onClick={this.getData.bind(this)}>
					请求
				</button>
				<button onClick={this.getCarData.bind(this)}>
					请求2
				</button>
			</div>
		)
	}
}

export default App
