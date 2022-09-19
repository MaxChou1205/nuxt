import {useAuth} from "#imports";

export default defineNuxtRouteMiddleware(() => {
    const {user} = useAuth();

    if (!user.value) return navigateTo('/')
})
