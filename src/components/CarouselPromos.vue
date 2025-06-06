<template>
    <section class="carousel-section">
      <h2>Promociones</h2>
      <div class="carousel">
        <button @click="prev" class="nav-btn">‹</button>
        <div class="carousel-window">
          <div
            class="carousel-track"
            :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
          >
            <div v-for="(promo, idx) in promos" :key="idx" class="carousel-item">
              <router-link
                v-if="promo.route"
                :to="promo.route"
                class="promo-card"
              >
                <img :src="promo.img" :alt="promo.title" />
                <div class="promo-info">
                  <h3>{{ promo.title }}</h3>
                  <p>{{ promo.desc }}</p>
                </div>
              </router-link>
              <div v-else class="promo-card">
                <img :src="promo.img" :alt="promo.title" />
                <div class="promo-info">
                  <h3>{{ promo.title }}</h3>
                  <p>{{ promo.desc }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button @click="next" class="nav-btn">›</button>
      </div>
      <div class="dots">
        <span
          v-for="(promo, idx) in promos"
          :key="idx"
          class="dot"
          :class="{ active: idx === currentIndex }"
          @click="currentIndex = idx"
        ></span>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const promos = [
    {
      title: '300 puntos',
      desc: 'Pack de vitaminas y minerales',
      img: '/imagenpuntos.png',
      route: '/promociones'
    },
    {
      title: '2x1 en cremas',
      desc: 'Llévate 2 cremas al precio de 1.',
      img: '/imagen2x1.png',
      route: '/promociones'
    },
    {
      title: 'Solares',
      desc: 'Descuentos de hasta 50% en productos solares',
      img: '/imagensol.png',
      route: '/promociones'
    }
  ]
  
  const currentIndex = ref(0)
  
  function next() {
    currentIndex.value = (currentIndex.value + 1) % promos.length
  }
  function prev() {
    currentIndex.value =
      (currentIndex.value - 1 + promos.length) % promos.length
  }
  </script>
  
  <style scoped>
  .carousel-section {
    margin-top: 20px;
  }
  .carousel-section h2 {
    font-size: 18px;
    color: #284e36;
    margin-bottom: 12px;
  }
  .carousel {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .carousel-window {
    overflow: hidden;
    width: 260px;
    border-radius: 18px;
  }
  .carousel-track {
    display: flex;
    transition: transform 0.5s;
  }
  .carousel-item {
    min-width: 260px;
    padding: 0 4px;
  }
  .promo-card {
    background: rgb(6, 202, 156,0.1);
    border-radius: 16px;
    box-shadow: 0 1px 5px #0002;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .promo-card img {
    width: 100%;
    height: 96px;
    object-fit: cover;
  }
  .promo-info {
    padding: 10px;
    text-align: center;
  }
  .promo-info h3 {
    margin: 0 0 6px;
    font-size: 16px;
    color: #23704b;
  }
  .promo-info p {
    margin: 0;
    font-size: 13px;
    color: #28513d;
  }
  .nav-btn {
    background: none;
    border: none;
    font-size: 28px;
    color: #23704b;
    cursor: pointer;
    padding: 0 12px;
  }
  .dots {
    text-align: center;
    margin-top: 8px;
  }
  .dot {
    display: inline-block;
    width: 9px;
    height: 9px;
    margin: 0 4px;
    background: #b8dcc8;
    border-radius: 50%;
    cursor: pointer;
  }
  .dot.active {
    background: #23704b;
  }
  </style>
  