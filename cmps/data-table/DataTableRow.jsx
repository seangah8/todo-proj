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
            
            <td className='txt'>{todo.txt}</td>
            <td className='importance'>
                {[1,2,3,4,5].map(num => {
                    if(todo.importance >= num) 
                        return <i class="fa-solid fa-fire-flame-curved"></i>
                })}
            </td>
            <td className='symbol'>
                <i onClick={() => {setIsExpanded(!isExpanded)}} 
                className="fa-solid fa-pen"></i>
            </td>
            <td className='symbol'>
                <i onClick={() => {onDoneTodo(todo)}} 
                className="fa-solid fa-check"></i>
            </td>
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
