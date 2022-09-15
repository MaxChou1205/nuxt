import {createClient} from '@supabase/supabase-js'

const useSupabase = () => {
    const config = useRuntimeConfig();

    const supabase = createClient(
        'https://czbenpkacyaszmymntyb.supabase.co', config.SUPABASE_KEY
    )

    return {supabase};
}

export default useSupabase;
