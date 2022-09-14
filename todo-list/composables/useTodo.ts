import {useAsyncData} from "#app";

const useTodo = () => {
    const {data: todos, refresh} = useAsyncData('todos', async () => {
        return $fetch('/api/todo');
    });

    const addTodo = async (item) => {
        if (!item) return;
        await $fetch('/api/todo', {
            method: 'post', body: {item}
        })
        await refresh();
    }
    const updateTodo = async (id) => {
        await $fetch(`/api/todo/${id}`, {method: 'put'})
        await refresh();
    }
    const deleteTodo = async (id) => {
        await $fetch(`/api/todo/${id}`, {method: 'delete'})
        await refresh();
    }

    return {todos, addTodo, updateTodo, deleteTodo}
}

export default useTodo;
