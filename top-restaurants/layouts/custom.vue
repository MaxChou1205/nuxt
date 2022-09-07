<template>
  <div>
    <slot/>
    <div class="temp">this is custom layout content</div>
  </div>
</template>

<style scoped>
.temp{
  padding: 20px;
  background-color: azure;
  width: 100%;
  text-align: center;
}
</style>