import {useRoute, useState} from "#app";
import {useSupabase} from "#imports";

const useAuth = () => {
    const user = useState('user', () => null);
    const {supabase} = useSupabase();
    const router = useRouter();

    supabase.auth.onAuthStateChange((e, session) => {
        user.value = session?.user || null;
    })

    const signup = async ({email, password, ...metadata}) => {
        const {user: u, error} = await supabase.auth.signUp({email, password},
            {data: metadata, redirectTo: `${window.location.protocol}/profile?source=email`})
        if (error) throw error;
        return u;
    }

    const login = async ({email, password}) => {
        const {user: u, error} = await supabase.auth.signIn({email, password})
        if (error) throw error;
        return u;
    }

    const logout = async () => {
        const {error} = await supabase.auth.signOut()
        if (error) throw error;
        router.push("/");
    }

    return {
        user,
        signup,
        login,
        logout
    }
}

export default useAuth
