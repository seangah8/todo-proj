const { useEffect, useState } = React

import { Chart } from "./Chart.jsx"
import { todoService } from "../services/todo.service.js"

export function Dashboard({todos}) {
    const [importanceStats, setImportanceStats] = useState([])


    useEffect(() => {
        if(todos.length) 
            setImportanceStats(todoService.getImportanceStats(todos)) 
    }, [todos])


    return (
        <section className="dashboard">
            <div className="dashboard-and-title">
                <h2>Dashboard - By Importance</h2>
                <Chart data={importanceStats} />
            </div>
        </section>
    )
}