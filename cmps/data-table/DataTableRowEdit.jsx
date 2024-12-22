const { useState } = React

export function DataTableRowEdit({ todo, setIsExpanded, onSetTodo }){

    const [todoToEdit, setTodoToEdit] = useState(todo)

    function handleChange({ target }){
        const field = target.name
        let value = target.value

        setTodoToEdit(prevTodo => 
            ({ ...prevTodo, [field]: value }))
    }

    function onSubmitTodo(ev){
        ev.preventDefault()
        onSetTodo(todoToEdit)
        setIsExpanded(false)

    }

    const { txt, importance } =  todoToEdit

    return (
        <form onSubmit={onSubmitTodo} className="data-table-row-edit">

            <input
            placeholder="Todo Text"
            type="txt"
            name="txt"
            value={txt}
            onChange={handleChange}/>

            <select id="importance" 
                name="importance" 
                value={importance}
                onChange={handleChange}>
                <option value={5}>Critical</option>
                <option value={4}>Essential</option>
                <option value={3}>Important</option>
                <option value={2}>Relevant</option>
                <option value={1}>Optional</option>
            </select>

            <button>Change</button>
            

            
        </form>
    )
}