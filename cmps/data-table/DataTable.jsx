import { DataTableRow } from "./DataTableRow.jsx"

export function DataTable({ todos, onRemoveTodo }) {
    return <table border="1" className="data-table">
        <thead>
            <tr>
                <th>Text</th>
                <th>Importance</th>
                <th>Edit</th>
                <th>IsDone</th>
            </tr>
        </thead>
        <tbody>
            {todos.map(todo =>
                <DataTableRow key={todo._id} todo={todo} onRemoveTodo={onRemoveTodo} />)}
        </tbody>
    </table>
}
