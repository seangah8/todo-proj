import { DataTableRowEdit } from './DataTableRowEdit.jsx'

const { useState, Fragment } = React
const { Link } = ReactRouterDOM

export function DataTableRow({ todo, onDoneTodo, onSetTodo }) {

    const [isExpanded, setIsExpanded] = useState(false)

    function importanceToWord(number){
        const importanceLevelStr = 
        ['Optional', 'Relevant', 'Important', 'Essential', 'Critical']

        return importanceLevelStr[number-1]
    }

    return <Fragment>
        <tr>
            
            <td className={(todo.isDone)? 'done' : ''}>{todo.txt}</td>
            <td>{importanceToWord(todo.importance)}</td>
            <td  className="toggle-expand" 
                onClick={() => {setIsExpanded(!isExpanded)}}>✏️
            </td>
            <td onClick={() => {onDoneTodo(todo)}}>✅</td>
        </tr>
        {(todo.txt === '' || isExpanded) && (
                <tr className="edit-row">
                    <td colSpan="5"> {/*makes the edit row exist
                    the whole row*/}
                        <DataTableRowEdit setIsExpanded={setIsExpanded} todo={todo} onSetTodo={onSetTodo}/>
                    </td>
                </tr>
            )}

    </Fragment>
}
