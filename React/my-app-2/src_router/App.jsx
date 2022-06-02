import { Component } from 'react'
import {Route, NavLink, Switch, Redirect} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Header from './components/Header'

const routes = [
	{
		to: '/about',
		title: 'About'
	},
	{
		to: '/home',
		title: 'Home'
	}
]

class App extends Component {
	render() {
		return (
			<div>
				<div className="row">
					<div className="col-xs-offset-2 col-xs-8">
						<Header>
						</Header>
					</div>
				</div>
				<div className="row">
					<div className="col-xs-2 col-xs-offset-2">
						<div className="list-group">
							{/* <NavLink className="list-group-item" to="/about">About</NavLink>
							<NavLink className="list-group-item" to="/home">Home</NavLink> */}
							{
								routes.map(route => {
									return (
										<NavLink key={route.to} className="list-group-item" {...route}>
											{route.title}
										</NavLink>
									)
								})
							}
						</div>
					</div>
					<div className="col-xs-6">
						<div className="panel">
							<div className="panel-body">
								<Switch>
									<Route path="/about" component={About}></Route>
									<Route path="/home" component={Home}></Route>
									<Redirect to="/about"></Redirect>
								</Switch>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default App
