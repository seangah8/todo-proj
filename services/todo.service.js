import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const TODO_KEY = 'todoDB'

export const todoService = {
    query,
    get,
    remove,
    save,
    getEmptyTodo,
    getDefaultFilter,
    getFilterFromSearchParams,
    getImportanceStats,
}
// For Debug (easy access from console):
window.cs = todoService

function query(userId, filterBy = {}) {
    return storageService.query(TODO_KEY)
        .then(todos => {


            todos = todos.filter(todo => todo.userId === userId)
            

            if(filterBy.orderBy){
                let finalTodoList = []
                if(filterBy.orderBy === 'date'){
                    while (todos.length > 0){
                        let earliestIndex = 0
                        for (let i = 1; i < todos.length; i++) {
                            if (todos[i].createdAt < todos[earliestIndex].createdAt) {
                                earliestIndex = i
                            }}
                        finalTodoList.push(todos[earliestIndex])
                        todos.splice(earliestIndex, 1)
                    }
                }
                if(filterBy.orderBy === 'importance'){
                    const importanceTodoArray = [[], [], [], [], []]
                    todos.forEach(todo => {
                        importanceTodoArray[todo.importance - 1].push(todo)})

                    finalTodoList = [...importanceTodoArray[4],
                    ...importanceTodoArray[3], ...importanceTodoArray[2], 
                    ...importanceTodoArray[1], ...importanceTodoArray[0]]
                }
                todos = finalTodoList
            }
            return todos
        })
}

function get(todoId) {
    return storageService.get(TODO_KEY, todoId)
        .then(todo => {
            todo = _setNextPrevTodoId(todo)
            return todo
        })
}

function remove(todoId) {
    return storageService.remove(TODO_KEY, todoId)
}

function save(todo) {
    if (todo._id) {
        // TODO - updatable fields
        todo.updatedAt = Date.now()
        return storageService.put(TODO_KEY, todo)
    } else {
        todo.createdAt = todo.updatedAt = Date.now()

        return storageService.post(TODO_KEY, todo)
    }
}

function getEmptyTodo(txt='', importance = 3) {
    return { txt, importance }
}

function getDefaultFilter() {
    return { orderBy: 'date'}
}

function getFilterFromSearchParams(searchParams) {
    const defaultFilter = getDefaultFilter()
    const filterBy = {}
    for (const field in defaultFilter) {
        filterBy[field] = searchParams.get(field) || ''
    }
    return filterBy
}


function getImportanceStats(todos) {
    const todoCountByImportanceMap = _getTodoCountByImportanceMap(todos)
    const data = Object.keys(todoCountByImportanceMap).map(speedName => ({ title: speedName, value: todoCountByImportanceMap[speedName] }))
    return data
}

function _setNextPrevTodoId(todo) {
    return storageService.query(TODO_KEY).then((todos) => {
        const todoIdx = todos.findIndex((currTodo) => currTodo._id === todo._id)
        const nextTodo = todos[todoIdx + 1] ? todos[todoIdx + 1] : todos[0]
        const prevTodo = todos[todoIdx - 1] ? todos[todoIdx - 1] : todos[todos.length - 1]
        todo.nextTodoId = nextTodo._id
        todo.prevTodoId = prevTodo._id
        return todo
    })
}

function _getTodoCountByImportanceMap(todos) {

    const todoCountByImportanceMap = todos.reduce((map, todo) => {
        if (todo.importance <= 2) map.low ++
        else if (todo.importance <= 4) map.normal ++
        else map.urgent++
        return map
    }, { low: 0, normal: 0, urgent: 0 })

    for (const key in todoCountByImportanceMap) {
        todoCountByImportanceMap[key] *= 100 / todos.length
        todoCountByImportanceMap[key] = 
            parseInt(todoCountByImportanceMap[key])
    }

    return todoCountByImportanceMap
}


