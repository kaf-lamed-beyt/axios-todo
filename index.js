import axios from 'axios'

const API__URL = 'https://jsonplaceholder.typicode.com'

const getTodoList = async () => {
    try {
        const res = await axios.get(`${API__URL}/todos`)
        const todos = response.data

        console.log(`GET: Here's the list of todos`, todos)
        return todos
    } catch(e) {
        console.error(e)
    }
}

const createListElement = (item) => {  // creates an HTML list element.
    const listItem = document.createElement('li')
    // attach an id such that when an element is clicked, it gets deleted
    listItem.id = item.id

    listItem.appendChild(document.createTextNode(item.title))
    listItem.onclick = async (e) => {
        await removeTodo(e, listItem)
    }
    return listItem
}

const addTodoItemToDOM = (todos) => {
    const ul = document.querySelector('ul')

    if (Array.isArray(todos) && todos.length > 0) {
        todos.map(todo => {
            ul.appendChild(createListElement(todo))
        })
    } else if (todos) {
        ul.appendChild(createListElement(todos))
    }
}

const main = async () => {
    addTodoItemToDOM(await getTodoList())
}

main()


const form = document.querySelector('form')

const formEvent = form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const todoName = document.querySelector("#todos__name").value
    const todoId = document.querySelector("#todos__id").value

    const todo = {
        todoName,
        todoId
    }

    const addedTodo = await addedTodo(todo)
    addTodoItemToDOM(addedTodo)
})

// the todo function
 export const addTodo = async(todo) => {
     try {
         const res = await axios.post(`${API__URL}/todos`, todo)
         const addedTodo = res.data

         console.log(`Added a new Todo Item`, addedTodo)

         return addedTodo
     } catch(e) {
         comsole.error(e)
     }
 }

//  delet functionality

export const deleteTodo = async (id) => {
    try {
        const res = await axios.delete(`${API__URL}/todos/${id}`)
        console.log(`Deleted Todo ID: `, id)

        return res.data
    } catch (e) {
        console.error(e)
    }
}

const removeTodo = async (e, listItem) => {
    e.target.parentElement.removeChild(listItem)
    const id = listItem.id

    await deleteTodo(id)
}