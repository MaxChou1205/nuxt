<template>
  <div>
    <TheHeader @sidenavToggle="showSidenav = !showSidenav" />
    <TheSidenav :show="showSidenav" @close="showSidenav = false" />
    <nuxt />
  </div>
</template>

<script>
import TheHeader from '@/components/Navigation/TheHeader.vue'
import TheSidenav from '@/components/Navigation/TheSidenav.vue'

export default {
  components: {
    TheHeader,
    TheSidenav,
  },
  data() {
    return {
      showSidenav: false,
    }
  },
}
</script>

<style>
html {
  font-family: 'Open Sans', sans-serif;
}

body {
  margin: 0;
}
</style>
