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
          <font-awesome-icon :icon="card.icon" class="icon" />
          <span class="label">{{ card.text }}</span>
        </router-link>
        <div
          v-else-if="card"
          class="card"
        >
          <font-awesome-icon :icon="card.icon" class="icon" />
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
  margin: 0 14px 26px 14px; /* Asegura el margen lateral */
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
  background: rgb(6, 202, 156,0.1);
  border-radius: 8px;
  padding: 18px 0 10px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 95px;
  min-height: 80px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05); 
  text-decoration: none; 
}

.icon {
  font-size: 26px; 
  margin-bottom: 8px;
  color: #003559; 
}
.label {
  font-size: 15px;
  color: #003559;
  text-align: center;
}
</style>