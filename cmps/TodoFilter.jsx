const { useState, useRef } = React

import { utilService } from "../services/util.service.js"

export function TodoFilter({ filterBy, onSetFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState({...filterBy})

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

            case "radio":
            value = target.value
            break

            default: break
        }

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)
    }

    const { orderBy } = filterByToEdit
    return (
        <section className="todo-filter">
            <h2>Filter Todos</h2>
            <form onSubmit={onSubmitFilter}>

            <label htmlFor="order-by">Order By: </label>
            <select id="order-by" value={orderBy} name="orderBy" onChange={handleChange}>
                <option value={'date'}>date</option>
                <option value={'importance'}>importance</option>
            </select>

                <button>Set Filter</button>
            </form>
        </section>
    )
}