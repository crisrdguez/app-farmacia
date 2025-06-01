<template>
    <section class="section-cards">
      <h2>{{ title }}</h2>
      <div class="cards">
        <template v-for="card in cards" :key="card?.text">
          <router-link
            v-if="card && card.route"
            :to="card.route"
            class="card"
          >
            <span class="icon" v-html="card.icon"></span>
            <span class="label">{{ card.text }}</span>
          </router-link>
          <div
            v-else-if="card"
            class="card"
          >
            <span class="icon" v-html="card.icon"></span>
            <span class="label">{{ card.text }}</span>
          </div>
        </template>
      </div>
    </section>
  </template>
  
  <script setup>
  defineProps(['title', 'cards']);
  </script>
  
  <style scoped>
  .section-cards {
    margin-bottom: 26px;
  }
  .section-cards h2 {
    font-size: 20px;
    margin-bottom: 10px;
    font-weight: 600;
    color: #284e36;
  }
  .cards {
    display: flex;
    gap: 18px;
  }
  .card {
    flex: 1;
    background: #f5fdf7;
    border-radius: 14px;
    padding: 18px 0 10px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 90px;
    min-height: 80px;
    box-shadow: 0 1px 4px #0001;
  }
  .icon {
    font-size: 26px;
    margin-bottom: 8px;
  }
  .label {
    font-size: 15px;
    color: #21432d;
    text-align: center;
  }
  </style>
  