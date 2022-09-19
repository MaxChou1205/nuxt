<script setup>
import useSupabase from "../composables/useSupabase";
import useAuth from "../composables/useAuth";

definePageMeta({
  middleware: ["auth"]
})

const {supabase} = useSupabase();
const {user} = useAuth();
const notesResponse = ref();

onMounted(() => {
  {
    if (process.client) {
      fetchData();
    }
  }
})

const fetchData = async () => {
  notesResponse.value = await supabase.from("notes").select().eq("user_id", user.value.id)
}
</script>

<template>
  <div class="container">
    <h3>My Notes</h3>
    <NotesForm :submit="fetchData"/>
    <div class="card-container" v-if="notesResponse?.data">
      <NCard class="card" v-for="note in notesResponse.data" :key="note.id">
        <h2>{{ note.title }}</h2>
        <p>{{ note.note }}</p>
      </NCard>
    </div>
  </div>
</template>


<style scoped>
.container {
  max-width: 50%;
  margin: 0 auto;
  padding: 3rem 0;
  height: 90vh;
}

h3 {
  font-size: 2rem;
}

.card-container {
  margin-top: 1.5rem;
}

.card {
  padding: 1rem;
}

.card h2 {
  font-weight: bold;
  font-size: 1.5rem;
}
</style>
