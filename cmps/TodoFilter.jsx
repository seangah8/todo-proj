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

    const { txt, importance, status} = filterByToEdit
    return (
        <section className="todo-filter">
            <h2>Filter Todos</h2>
            <form onSubmit={onSubmitFilter}>
                <input value={txt} onChange={handleChange}
                    type="search" placeholder="By Txt" id="txt" name="txt"
                />
                <label htmlFor="importance">Importance: </label>
                <input value={importance} onChange={handleChange}
                    type="number" placeholder="By Importance" id="importance" name="importance"
                />
                <section className="status-filter">
          <h3>Status</h3>

          {/* Radio Buttons - share the same name */}
          <label htmlFor="statusAll">All</label>
          <input
            type="radio"
            id="statusAll"
            name="status"
            value="all"
            checked={status === "all"}
            onChange={handleChange}
          />

          <label htmlFor="statusActive">Active</label>
          <input
            type="radio"
            id="statusActive"
            name="status"
            value="active"
            checked={status === "active"}
            onChange={handleChange}
          />

          <label htmlFor="statusDone">Done</label>
          <input
            type="radio"
            id="statusDone"
            name="status"
            value="done"
            checked={status === "done"}
            onChange={handleChange}
          />
        </section>
                

                

                <button>Set Filter</button>
            </form>
        </section>
    )
}