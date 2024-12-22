import { DataTableRow } from "./DataTableRow.jsx"

export function DataTable({ todos, onDoneTodo, onSetTodo }) {
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
                <DataTableRow 
                key={todo._id} 
                todo={todo} 
                onSetTodo={onSetTodo} 
                onDoneTodo={onDoneTodo} />)}
        </tbody>
    </table>
}
