const { useState, Fragment } = React
const { Link } = ReactRouterDOM

export function DataTableRow({ todo, onRemoveTodo }) {

    const [, setIsExpanded] = useState(false)

    return <Fragment>
        <tr>
            
            <td className={(todo.isDone)? 'done' : ''}>{todo.txt}</td>
            <td>{todo.importance}</td>
            <td><Link to={`/todo/edit/${todo._id}`}>Edit</Link></td>
            <td onClick={() => {onRemoveTodo(todo)}}> Done</td>
        </tr>

    </Fragment>
}
