import { todoService } from "../services/todo.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

import { saveTodo } from '../store/actions/todo.actions.js'
<<<<<<< HEAD
import { addScore } from '../store/actions/user.actions.js'
=======
<<<<<<< HEAD
import { addScore, addActivity } from '../store/actions/user.actions.js'
=======
import { addScore } from '../store/actions/user.actions.js'
>>>>>>> 0dfc0722b07f2cabd81f41d2ec5567960059bedb
>>>>>>> 69ee785 (Reinitialize Git and add existing files)

const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM
const { useSelector } = ReactRedux
<<<<<<< HEAD

=======
<<<<<<< HEAD
//asdaf
=======

>>>>>>> 0dfc0722b07f2cabd81f41d2ec5567960059bedb
>>>>>>> 69ee785 (Reinitialize Git and add existing files)
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
<<<<<<< HEAD
            addScore(10)
        }
=======
<<<<<<< HEAD
            await addScore(10)
            addActivity(`complished todo: ${todoToEdit.txt}`)
        }
        else {
            params.todoId ? 
            addActivity(`edited todo: ${todoToEdit.txt}`) :
            addActivity(`added todo: ${todoToEdit.txt}`)
        } 
=======
            addScore(10)
        }
>>>>>>> 0dfc0722b07f2cabd81f41d2ec5567960059bedb
>>>>>>> 69ee785 (Reinitialize Git and add existing files)
        navigate('/todo')
        showSuccessMsg(`Todo Saved!`)
    }

    if(!todoToEdit) return <p>Loading...</p>

    const { txt, importance, isDone } = todoToEdit

    return (
        <section className="todo-edit">
            <form onSubmit={onSaveTodo} >
                <label htmlFor="txt">Text:</label>
<<<<<<< HEAD
=======
<<<<<<< HEAD
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
=======
>>>>>>> 69ee785 (Reinitialize Git and add existing files)
                <input onChange={handleChange} value={txt} type="text" name="txt" id="txt" />

                <label htmlFor="importance">Importance:</label>
                <input onChange={handleChange} value={importance} type="number" name="importance" id="importance" />

                <label htmlFor="isDone">isDone:</label>
                <input onChange={handleChange} value={isDone} type="checkbox" name="isDone" id="isDone" />
<<<<<<< HEAD
=======
>>>>>>> 0dfc0722b07f2cabd81f41d2ec5567960059bedb
>>>>>>> 69ee785 (Reinitialize Git and add existing files)


                <button>Save</button>
            </form>
        </section>
    )
}