import React, { Component } from 'react'
import {NavLink, Route, Switch, Redirect} from 'react-router-dom'
import Message from './Message/index'
import News from './News/index'

const homeRoutes = [
    {
		to: '/home/news',
		title: 'News',
        component: News
	},
	{
		to: '/home/messages',
		title: 'Messages',
        component: Message
	}
]

export default class Home extends Component {
    render() {
        return (
            <div>
                <h2>Home组件内容</h2>
                <div>
                    <ul className="nav nav-tabs">
                        {
                            homeRoutes.map(route => {
                                const newRoute = JSON.parse(JSON.stringify(route))
                                delete newRoute.component
                                return (
                                    <li key={route.to}>
                                        <NavLink className="list-group-item" {...newRoute}>
                                            {route.title}
                                        </NavLink>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <Switch>
                        {
                            homeRoutes.map(route => {
                                return (
                                    <Route key={route.to} path={route.to} component={route.component}></Route>
                                )
                            })
                        }
                        <Redirect to="/home/news"></Redirect>
                    </Switch>
                </div>
            </div>
        )
    }
}
