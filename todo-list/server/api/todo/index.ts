import {db} from "../../db"
import {v4 as uuid} from "uuid";
import {createError, sendError} from "h3";

export default defineEventHandler(async (e) => {
    const method = e.req.method
    if (method === "GET") {
        return db.todos;
    } else if (method === "POST") {
        const body = await useBody(e);

        if (!body.item) {
            const error = createError({
                statusCode: 400,
                statusMessage: "key 'item' is required",
            })
            sendError(e, error);
        }

        const newTodo = {
            id: uuid(),
            item: body.item,
            completed: false
        }

        db.todos.push(newTodo)

        return newTodo;
    }
})
