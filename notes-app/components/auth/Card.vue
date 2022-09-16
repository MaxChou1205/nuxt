<script setup lang="ts">
import useAuth from "~/composables/useAuth";

const authState = ref<'login' | 'signup'>('login');
const {user, signup} = useAuth();

const toggleAuthState = () => {
  if (authState.value === 'login') authState.value = 'signup';
  else authState.value = 'login';
}

const handleSubmit = () => {
  signup({email: "hmsymgxmmucsngflmb@nvhrw.com", password: "123456"})
}
</script>

<template>
  <div>
    <NCard class="card">
      <div>
        <h3>{{ authState }}</h3>
        <div class="input-container">
          <input placeholder="Email"/>
          <input
              placeholder="Password"
              type="password"
          />
        </div>
        <NButton @click="handleSubmit">Submit</NButton>
        <!--        <p class="error" v-if="authError">{{ authError }}</p>-->
        <p @click="toggleAuthState">
          {{
            authState === "login"
                ? "Don't have an account? Create one now"
                : "Already have an account? Go ahead an log in"
          }}
        </p>
      </div>
      <!--      <div v-else>-->
      <!--        <h3>Check email for confirmation message</h3>-->
      <!--      </div>-->
    </NCard>
  </div>
</template>

<script setup>
</script>

<style scoped>
.card {
  padding: 1rem;
  width: 25rem;
}

.card h3 {
  font-size: 1.75rem;
  text-transform: capitalize;
}

.input-container {
  display: flex;
  flex-direction: column;
}

.input-container input {
  margin-bottom: 0.3rem;
  padding: 0.2rem;
  outline: none;
  border: 0.1rem solid rgba(0, 0, 0, 0.1);
  border-radius: 0.2rem;
}

p {
  color: blue;
  font-size: 0.5rem;
  cursor: pointer;
}

.error {
  color: red;
}
</style>
