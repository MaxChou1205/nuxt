import {db} from "../../db"
import {defineEventHandler, createError, sendError} from "h3";

export default defineEventHandler(async (e) => {
    const method = e.req.method;
    const context = e.context;
    const {id} = context.params;

    if (!id) {
        const error = createError({
            statusCode: 400,
            statusMessage: "id is required"
        })
        sendError(e, error);
    }

    if (method === "PUT") {
        let index;
        const todo = db.todos.find((t, i) => {
            if (t.id === id) {
                index = i;
                return true;
            }
            return false;
        })

        if (!todo) {
            const error = createError({
                statusCode: 404,
                statusMessage: "id is not found",
                data: {}
            })

            sendError(e, error);
        }


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
