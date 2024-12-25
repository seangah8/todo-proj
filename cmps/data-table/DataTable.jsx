import { DataTableRow } from "./DataTableRow.jsx"

export function DataTable({ todos, onDoneTodo, onSetTodo }) {
    return <table border="1" className="data-table">
        <tbody>
            {todos.map(todo =>
                <DataTableRow 
                key={todo._id} 
                todo={todo} 
                onSetTodo={onSetTodo} 
                onDoneTodo={onDoneTodo} />)}
        </tbody>
    </table>
}
