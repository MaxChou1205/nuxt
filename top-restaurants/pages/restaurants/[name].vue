<script setup lang="ts">
import restaurants from "@/data.json";
const route = useRoute();
const router = useRouter();
const name = route.params.name;
const restaurant = restaurants.find(r => r.name === name);
if (!restaurant) {
  router.push("/404");
}

useHead({
  title: name as string,
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  charset: "utf-8",
  meta: [{ name: "description", content: "My amazing site." }]
});
</script>

<template>
  <div>
    <Head>
      <Title>{{ name }}</Title>
    </Head>

    <div class="restaurant-container">
      <div class="image-container">
        <img :src="restaurant?.imageUrl" alt="" />
      </div>
      <div class="info-container">
        <h1>{{ restaurant?.name }}</h1>
        <div class="stats-container">
          <h5>Revenue (in billions)</h5>
          <p>${{ restaurant?.revenue }}</p>
        </div>
        <div class="stats-container">
          <h5>Number of Stores</h5>
          <p>{{ restaurant?.numberOfStores }}</p>
        </div>
        <p class="content">{{ restaurant?.content }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.restaurant-container {
  display: flex;
}
.image-container {
  width: 75%;
  height: 95vh;
}
.image-container img {
  width: 100%;
  height: 100%;
}
.restaurant-not-found {
  height: 75vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.info-container {
  padding: 3rem;
  width: 50%;
}
.info-container h1 {
  text-transform: uppercase;
  font-size: 6rem;
  margin-bottom: 3rem;
}
.stats-container {
  display: flex;
  align-items: flex-end;
  margin-bottom: 1rem;
}
.stats-container h5 {
  width: 20rem;
  font-size: 2rem;
  margin: 0;
  margin-right: 5rem;
}
.stats-container p {
  font-size: 2rem;
  margin: 0;
}
.content {
  font-size: 1.5rem;
  margin-top: 4rem;
}
</style>
