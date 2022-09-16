import {useState} from "#app";
import {useSupabase} from "#imports";

const useAuth = () => {
    const user = useState('user', () => null);
    const {supabase} = useSupabase();

    supabase.auth.onAuthStateChange((e, session) => {
        user.value = session?.user || null;
    })

    const signup = async ({email, password, ...metadata}) => {
        const {user: u, error} = await supabase.auth.signUp({email, password}, {data: metadata})

        if (error) throw error;

        return u;
    }

    return {
        user,
        signup
    }
}

export default useAuth
