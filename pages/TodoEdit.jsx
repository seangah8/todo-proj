import { todoService } from "../services/todo.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

import { saveTodo } from '../store/actions/todo.actions.js'
import { addScore, addActivity } from '../store/actions/user.actions.js'

const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM
const { useSelector } = ReactRedux

export function TodoEdit() {

    const [todoToEdit, setTodoToEdit] = useState(todoService.getEmptyTodo())
    const navigate = useNavigate()
    const params = useParams()

    const todos = useSelector(storeState =>
        storeState.todoModule.todos)

    useEffect(() => {
        if (params.todoId) loadTodo()
    }, [todos])

    function loadTodo() {
        const thisTodo = todos.find(todo=>
            todo._id === params.todoId)

        setTodoToEdit(thisTodo)
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break

            case 'checkbox':
                value = target.checked
                break

            default:
                break
        }

        setTodoToEdit(prevTodoToEdit => ({ ...prevTodoToEdit, [field]: value }))
    }

    async function onSaveTodo(ev) {
        ev.preventDefault()
        await saveTodo(todoToEdit)
        if(todoToEdit.isDone) {
            await addScore(10)
            addActivity(`complished todo: ${todoToEdit.txt}`)
        }
        else {
            params.todoId ? 
            addActivity(`edited todo: ${todoToEdit.txt}`) :
            addActivity(`added todo: ${todoToEdit.txt}`)
        } 
        navigate('/todo')
        showSuccessMsg(`Todo Saved!`)
    }

    if(!todoToEdit) return <p>Loading...</p>

    const { txt, importance, isDone } = todoToEdit

    return (
        <section className="todo-edit">
            <form onSubmit={onSaveTodo} >
                <label htmlFor="txt">Text:</label>
                <input 
                onChange={handleChange} 
                value={txt} type="text" 
                name="txt" 
                id="txt" />

                <label htmlFor="importance">Importance:</label>
                <input 
                onChange={handleChange} 
                value={importance} 
                type="number" 
                name="importance" 
                id="importance" />

                <label htmlFor="isDone">isDone:</label>
                <input 
                onChange={handleChange} 
                checked={isDone}
                value={isDone} 
                type="checkbox" 
                name="isDone" 
                id="isDone" />


                <button>Save</button>
            </form>
        </section>
    )
}