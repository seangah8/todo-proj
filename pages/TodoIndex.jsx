import { TodoFilter } from "../cmps/TodoFilter.jsx"
import { DataTable } from "../cmps/data-table/DataTable.jsx"
import { Dashboard } from "../cmps/Dashboard.jsx"
import { todoService } from "../services/todo.service.js"
import { removeTodo, loadTodos, saveTodo } from '../store/actions/todo.actions.js'
import { updateUser } from '../store/actions/user.actions.js'
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
        if(user) loadTodos(user._id, filterBy)
    }, [filterBy])

    async function onDoneTodo(todo) {
        if(todo){
            await removeTodo(todo._id)
            // Local variables like user don’t react
            // to Redux state updates
            const updatedUser = await addScore(10) 
            addActivity(`Done: ${todo.txt}`, updatedUser)
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

    function addActivity(txt, user){
        const activity = {txt, at: Date.now()}
        const updatedUser = { ...user,
                activities: [activity, ...user.activities] }
        updateUser(updatedUser)
    }

    async function addScore(score){
        const balance = user.balance + score
        const updatedUser = { ...user, balance}
        await updateUser(updatedUser)
        return updatedUser
    }


    if(!user) return <h1> No User Connected </h1>

    else if (isLoading) return <div>Loading...</div>

    return (
        <section className="todo-index">

            <section className="todos">
                <TodoFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
                
                <button 
                className="add-todo" 
                onClick={addNewTodo}>+</button>

                {
                    todos?
                    <DataTable todos={todos} onSetTodo={onSetTodo} onDoneTodo={onDoneTodo} />
                    : <h3>Add Things Todo!</h3>
                }

            </section>

            {todos? <Dashboard todos={todos}/> : ''}

            


        </section>
    )
}