import { Component, lazy, Suspense } from 'react'
import {Route, NavLink, Switch, Redirect} from 'react-router-dom'

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

const Home = lazy(() => import('../../pages/Home'))
const About = lazy(() => import('../../pages/About'))

class App extends Component {
	render() {
		return (
			<div>
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
                                <Suspense fallback={<h1>loading……</h1>}>
                                    <Switch>
                                        <Route path="/about" component={About}></Route>
                                        <Route path="/home" component={Home}></Route>
                                        <Redirect to="/about"></Redirect>
                                    </Switch>
                                </Suspense>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default App
