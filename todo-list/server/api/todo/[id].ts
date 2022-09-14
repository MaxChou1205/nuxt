import {db} from "../../db"

export default defineEventHandler(async (e) => {
    const method = e.req.method;
    const context = e.context;
    const {id} = context.params;

    if (method === "PUT") {
        let index;
        const todo = db.todos.find((t, i) => {
            if (t.id === id) {
                index = i;
                return true;
            }
            return false;
        })

        if (!todo) throw new Error();

        const updatedTodo = {
            ...todo,
            completed: !todo.completed
        }

        db.todos[index] = updatedTodo;

        return updatedTodo;
    }

    if (method === "DELETE") {
        db.todos = db.todos.filter(t => t.id !== id)

        return {
            message: "item deleted"
        }
    }
})
