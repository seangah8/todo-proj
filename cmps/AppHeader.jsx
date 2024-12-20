const { useEffect } = React
const { Link, NavLink } = ReactRouterDOM

import { UserMsg } from "./UserMsg.jsx"
import { LoginSignup } from './LoginSignup.jsx'
import { logout } from '../store/actions/user.actions.js'
import { loadTodos } from '../store/actions/todo.actions.js'


const { useSelector } = ReactRedux


export function AppHeader() {
    const user = useSelector(storeState => storeState.userModule.loggedInUser)
    const todos = useSelector(storeState => storeState.todoModule.todos)

    useEffect(()=>{
        loadTodos()
    },[])
    
    
    function todosPrecentage(){
        if(todos.length <= 0) return 0
        let doneTodos = 0
        for(let i=0; i < todos.length; i++){
            if(todos[i].isDone) doneTodos ++
        }
        return parseInt((doneTodos/todos.length) * 100)
    }

    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <h1>React Todo App</h1>

                <section>
                    <p>Todos Progress: {todosPrecentage()}%</p>
                </section>

                {user ? <p>score: {user.balance}</p> : ''}

                {user ? (
                    < section >

                        <Link to={`/user/${user._id}`}>Hello {user.username}</Link>
                        <button onClick={logout}>Logout</button>
                    </ section >
                ) : (
                    <section>
                        <LoginSignup/>
                    </section>
                )}

                

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
