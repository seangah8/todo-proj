import { TodoFilter } from "../cmps/TodoFilter.jsx"
import { TodoList } from "../cmps/TodoList.jsx"
import { DataTable } from "../cmps/data-table/DataTable.jsx"
import { RemoveConfirmation } from '../cmps/RemoveConfirmation.jsx'
import { todoService } from "../services/todo.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

import { removeTodo, loadTodos, createDemoTodos } from '../store/actions/todo.actions.js'
import { addActivity } from '../store/actions/user.actions.js'
import { SET_FILTER_BY } from '../store/reducers/todo.reducer.js'

const { useEffect, useState } = React
const { Link } = ReactRouterDOM
const { useSelector, useDispatch } = ReactRedux

export function TodoIndex() {
    const todos = useSelector(storeState => storeState.todoModule.todos)
    const isLoading = useSelector(storeState => storeState.todoModule.isLoading)
    const filterBy = useSelector(storeState => storeState.todoModule.filterBy)
    const user = useSelector(storeState => storeState.userModule.loggedInUser)

    const dispatch = useDispatch()

    const [removeConfirmationTodo, setRemoveConfirmationTodo] = useState(null)

    useEffect(() => {
        if(user) loadTodos()
    }, [filterBy])


    function onRemoveConfirmation(todo) {
        setRemoveConfirmationTodo(todo)
    }

    function onRemoveTodo(todo) {
        if(todo){
            removeTodo(todo._id)
            addActivity(`removed todo: ${todo.txt}`)
        }
    }

    function onSetFilterBy(filterBy) {
        dispatch({ type: SET_FILTER_BY, filterBy })
    }


    function onToggleTodo(todo) {
        const todoToSave = { ...todo, isDone: !todo.isDone }
        todoService.save(todoToSave)
            .then((savedTodo) => {
                setTodos(prevTodos => prevTodos.map(currTodo => (currTodo._id !== todo._id) ? currTodo : { ...savedTodo }))
                showSuccessMsg(`Todo is ${(savedTodo.isDone)? 'done' : 'back on your list'}`)
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot toggle todo ' + todoId)
            })
    }

    if(!user) return <h1> No User Connected </h1>

    else if (isLoading) return <div>Loading...</div>

    else if(!todos.length) return (
        <section className="todo-index">
            <h1> No Todos To Do! </h1>
            <Link to="/todo/edit" className="btn" >Add Todo</Link>
        </section>  
    )

    return (
        <section className="todo-index">
            
            <TodoFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
            <div>
                <Link to="/todo/edit" className="btn" >Add Todo</Link>
            </div>

            <h2>Todos List</h2>
            
            <RemoveConfirmation 
            todo = {removeConfirmationTodo}
            onRemoveTodo={onRemoveTodo} 
            onRemoveConfirmation={onRemoveConfirmation}/>

            <TodoList todos={todos} onRemoveTodo={onRemoveConfirmation} onToggleTodo={onToggleTodo} />
            <hr />
            <h2>Todos Table</h2>
            <div style={{ width: '60%', margin: 'auto' }}>
                <DataTable todos={todos} onRemoveTodo={onRemoveConfirmation} />
            </div>
        </section>
    )
}