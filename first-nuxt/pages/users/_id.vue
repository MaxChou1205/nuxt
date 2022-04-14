<template>
  <h1>Single User Page, id: {{ $route.params.id }}</h1>
</template>

<script>
export default {
  validate(data) {
    return /^[0-9]+$/.test(data.params.id)
  },
}
</script>

<style></style>
