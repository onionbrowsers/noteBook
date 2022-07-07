import { NavLink, Navigate, useRoutes, useInRouterContext } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Message from './pages/Home/Message/index'
import Detail from './pages/Home/Message/Detail'
import News from './pages/Home/News/index'
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

function App() {
    const elements = useRoutes([
        {
            path: '/about',
            element: <About></About>
        },
        {
            path: '/home',
            element: <Home></Home>,
            children: [
                {
                    path: 'news',
                    element: <News />
                },
                {
                    path: 'messages',
                    element: <Message />,
                    children: [
                        // {
                        //     path: 'detail/:id/:title',
                        //     element: <Detail></Detail>
                        // },
                        {
                            path: 'detail',
                            element: <Detail></Detail>
                        }
                    ]
                },
                {
                    path: '/home',
                    element: <Navigate to='/home/news'></Navigate>
                }
            ]
        },
        {
            path: '/',
            element: <Navigate to='/about'></Navigate>
        }
    ])
    console.log(useInRouterContext())
    return (
        <div>
            <div className="row">
                <div className="col-xs-offset-2 col-xs-8">
                    <Header></Header>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-2 col-xs-offset-2">
                    <div className="list-group">
                        {
                            routes.map(route => {
                                return (
                                    <NavLink key={route.to} className={({ isActive }) => isActive ? 'list-group-item active' : 'list-group-item'} {...route}>
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
                            {elements}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App
