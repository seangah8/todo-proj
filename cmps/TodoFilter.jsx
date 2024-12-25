const { useState } = React

export function TodoFilter({ filterBy, onSetFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState({...filterBy})

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        const newFilterByToEdit = {...filterByToEdit, [field]: value}

        setFilterByToEdit(newFilterByToEdit)
        onSubmitFilter(newFilterByToEdit)
    }

    function onSubmitFilter(newFilterByToEdit) {
        onSetFilterBy(newFilterByToEdit)
    }

    const { orderBy } = filterByToEdit
    return (
        <section className="todo-filter">
            <label htmlFor="order-by">Order By: </label>
            <select id="order-by" value={orderBy} name="orderBy" onChange={handleChange}>
                <option value={'date'}>date</option>
                <option value={'importance'}>importance</option>
            </select>
        </section>
    )
}