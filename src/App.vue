<template>
  <div class="main-layout">
    <TopBar />
    <div class="main-content">
      <router-view />
    </div>
    <BottomNav />
  </div>
</template>

<script setup>
import TopBar from './components/TopBar.vue'
import BottomNav from './components/BottomNav.vue'
</script>

<style scoped>
.main-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.main-content {
  flex: 1;
  padding-bottom: 70px; /* espacio para el BottomNav */
  padding-top: 60px;    /* espacio para el TopBar si es fixed */
}
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
