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
            <span class="icon" v-html="feature.icon"></span>
            <span class="label">{{ feature.text }}</span>
            <span v-if="feature.badge" class="badge">{{ feature.badge }}</span>
          </router-link>
          <div
            v-else-if="feature"
            class="feature"
          >
            <span class="icon" v-html="feature.icon"></span>
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
  .feature-grid h2 {
    font-size: 18px;
    margin-bottom: 10px;
    color: #284e36;
  }
  .grid {
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
  }
  .feature {
    flex: 1 1 0;
    min-width: 90px;
    background: #f5fdf7;
    border-radius: 14px;
    padding: 16px 0 8px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    margin-bottom: 10px;
    text-decoration: none;
  }
  .icon {
    font-size: 25px;
    margin-bottom: 7px;
  }
  .label {
    font-size: 15px;
    color: #21432d;
    text-align: center;
  }
  .badge {
    position: absolute;
    top: 10px; right: 10px;
    background: #baf3ca;
    color: #267342;
    font-size: 12px;
    padding: 2px 8px;
    border-radius: 12px;
  }
  </style>
  