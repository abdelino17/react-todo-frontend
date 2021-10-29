import Todo from '../types/Todo'

const baseUrl = `${import.meta.env.VITE_API_BASE_URL}/todos`

export const loadTodos = (): Promise<any> => {
    return fetch(baseUrl).then((res) => res.json())
}

export const getTodo = (id: number): Promise<any> => {
    return fetch(`${baseUrl}/${id}`).then((res) => res.json)
}

export const createTodo = (todo: Todo): Promise<any> => {
    return fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: todo.title,
            completed: todo.completed
        })
    }).then((res) => res.json())
}

export const updateTodo = (todo: Todo): Promise<any> => {
    return fetch(`${baseUrl}/${todo.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: todo.title,
            completed: todo.completed
        })
    }).then((res) => res.json())
}

export const deleteTodo = (id: number | undefined): Promise<any> => {
    return fetch(`${baseUrl}/${id}`, {
        method: "DELETE",
    }).then((res) => res)
}