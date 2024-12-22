const { NavLink } = ReactRouterDOM

import { UserMsg } from "./UserMsg.jsx"
import { LoginSignup } from './LoginSignup.jsx'


const { useSelector } = ReactRedux


export function AppHeader() {
    const user = useSelector(storeState => storeState.userModule.loggedInUser)

    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <h1>React Todo App</h1>

                

                <nav className="app-nav">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/todo" >Todos</NavLink>
                    <NavLink to="/dashboard" >Dashboard</NavLink>
                    <NavLink to="/profile">Profile</NavLink>
                </nav>
            </section>
            <UserMsg />
        </header>
    )
}
