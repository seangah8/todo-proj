import { TodoFilter } from "../cmps/TodoFilter.jsx"
import { DataTable } from "../cmps/data-table/DataTable.jsx"
import { todoService } from "../services/todo.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

import { removeTodo, loadTodos, saveTodo } from '../store/actions/todo.actions.js'
import { addActivity } from '../store/actions/user.actions.js'
import { SET_FILTER_BY } from '../store/reducers/todo.reducer.js'

const { useEffect } = React
const { useSelector, useDispatch } = ReactRedux

export function TodoIndex() {
    const todos = useSelector(storeState => storeState.todoModule.todos)
    const isLoading = useSelector(storeState => storeState.todoModule.isLoading)
    const filterBy = useSelector(storeState => storeState.todoModule.filterBy)
    const user = useSelector(storeState => storeState.userModule.loggedInUser)

    const dispatch = useDispatch()

    useEffect(() => {
        if(user) loadTodos()
    }, [filterBy])


    function onDoneTodo(todo) {
        if(todo){
            removeTodo(todo._id)
            addActivity(`Done: ${todo.txt}`)
        }
    }

    function onSetFilterBy(filterBy) {
        dispatch({ type: SET_FILTER_BY, filterBy })
    }

    function onSetTodo(todo){
        saveTodo(todo)
    }

    function addNewTodo(){
        const newTodo = todoService.getEmptyTodo()
        saveTodo({userId: user._id, ...newTodo})
    }

    if(!user) return <h1> No User Connected </h1>

    else if (isLoading) return <div>Loading...</div>

    return (
        <section className="todo-index">

            <TodoFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
            <button onClick={addNewTodo}>Add Todo</button>

            {
                todos.length?
                <DataTable todos={todos} onSetTodo={onSetTodo} onDoneTodo={onDoneTodo} />
                : ''
            }


        </section>
    )
}