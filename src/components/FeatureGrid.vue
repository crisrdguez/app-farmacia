<template>
  <section class="feature-grid">
    <h2>{{ title }}</h2>
    <div class="grid">
      <template v-for="feature in features" :key="feature?.text">
        <router-link
          v-if="feature && feature.route"
          :to="feature.route"
          class="feature"
        >
          <font-awesome-icon :icon="feature.icon" class="icon" />
          <span class="label">{{ feature.text }}</span>
          <span v-if="feature.badge" class="badge">{{ feature.badge }}</span>
        </router-link>
        <div
          v-else-if="feature"
          class="feature"
        >
          <font-awesome-icon :icon="feature.icon" class="icon" />
          <span class="label">{{ feature.text }}</span>
          <span v-if="feature.badge" class="badge">{{ feature.badge }}</span>
        </div>
      </template>
    </div>
  </section>
</template>

<script setup>
defineProps(['title', 'features']);
</script>

<style scoped>
.feature-grid {
    margin: 0 14px 26px 14px;
}
.feature-grid h2 {
  font-size: 18px;
  margin-bottom: 10px;
  color: #284e36;
}
.grid {
  display: flex;
  gap: 15px;
}
.feature {
  flex: 1 1 0; 
  min-width: 90px;
  background: #fff;
  border-radius: 8px;
  padding: 16px 0 8px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin-bottom: 10px;
  text-decoration: none;
  box-shadow: 0 1px 4px rgba(0,0,0,0.08); 
}

.icon {
  font-size: 25px;
  margin-bottom: 7px;
  color: #003559;
}
.label {
  font-size: 15px;
  color: #003559;
  text-align: center;
}
.badge {
  position: absolute;
  top: 10px; right: 10px;
  background: #baf3ca;
  color: #003559;
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 12px;
}
</style>