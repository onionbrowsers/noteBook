import React from 'react'
import {NavLink, Outlet, useOutlet} from 'react-router-dom'

const homeRoutes = [
    {
		to: './news',
		title: 'News'
	},
	{
		to: './messages',
		title: 'Messages'
	}
]

export default function Home() {
    console.log('123', useOutlet())
    return (
        <div>
            <h2>Home组件内容</h2>
            <div>
                <ul className="nav nav-tabs">
                    {
                        homeRoutes.map(route => {
                            return (
                                <li key={route.to}>
                                    <NavLink className="list-group-item" {...route}>
                                        {route.title}
                                    </NavLink>
                                </li>
                            )
                        })
                    }
                </ul>
                <Outlet></Outlet>
            </div>
        </div>
    )
}
