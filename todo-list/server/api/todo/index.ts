import {db} from "../../db"
import {v4 as uuid} from "uuid";

export default defineEventHandler(async (e) => {
    const method = e.req.method
    if (method === "GET") {
        return db.todos;
    } else if (method === "POST") {
        const body = await useBody(e);

        if (!body.item) throw new Error("key 'item' is required");

        const newTodo = {
            id: uuid(),
            item: body.item,
            completed: false
        }

        db.todos.push(newTodo)

        return newTodo;
    }
})
