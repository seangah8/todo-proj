import { todoService } from "../services/todo.service.js"
import { showErrorMsg } from "../services/event-bus.service.js"

import { loadTodos } from "../store/actions/todo.actions.js"

const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM
const { useSelector } = ReactRedux


export function TodoDetails() {

    const todos = useSelector(storeState =>
         storeState.todoModule.todos)

    const [todo, setTodo] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadTodo()
    }, [params.todoId, todos]) // todos get update within the header


    async function loadTodo() {
        const thisTodo = todos.find(todo=>
            todo._id === params.todoId)
        setTodo(thisTodo)
    }

    function onBack() {
        // If nothing to do here, better use a Link
        navigate('/todo')
        // navigate(-1)
    }

    if (!todo) return <div>Loading...</div>
    return (
        <section className="todo-details">
            <h1 className={(todo.isDone)? 'done' : ''}>{todo.txt}</h1>
            <h2>{(todo.isDone)? 'Done!' : 'In your list'}</h2>

            <h1>Todo importance: {todo.importance}</h1>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim rem accusantium, itaque ut voluptates quo? Vitae animi maiores nisi, assumenda molestias odit provident quaerat accusamus, reprehenderit impedit, possimus est ad?</p>
            <button onClick={onBack}>Back to list</button>
            <div>
                <Link to={`/todo/${todo.nextTodoId}`}>Next Todo</Link> |
                <Link to={`/todo/${todo.prevTodoId}`}>Previous Todo</Link>
            </div>
        </section>
    )
}