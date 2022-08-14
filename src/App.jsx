import React from 'react'
import { useRoutes } from 'react-router-dom'
import routes from './routes'

// import Home from './page/Home'
// import Login from './page/Login'
// import Register from './page/Register'
// import Nav from './page/Home/Nav'
// import Users from './page/Home/Users'


const App = () => {
    const element = useRoutes(routes)

    return (
        <>
            {element}
        </>
    )
}

export default App