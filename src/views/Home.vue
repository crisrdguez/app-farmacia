<template>
    <div class="home">
      <div class="greeting">
        Buenas tardes, <span class="name">RAIMUNDO</span>
      </div>
      <div>
        <input type="text" placeholder="Búsqueda de productos 🔍" class="search"/>
      </div>
  
      <!-- Más utilizados -->
      <SectionCards
        title="Más utilizados"
        :cards="usedCards"
      />
  
      <!-- Descubre más -->
      <FeatureGrid
        title="Descubre más"
        :features="discoverFeatures"
      />

      <CarouselPromos />
    </div>
  </template>
  
  <script setup>
  import TopBar from '../components/TopBar.vue';
  import SectionCards from '../components/SectionCards.vue';
  import FeatureGrid from '../components/FeatureGrid.vue';
  import BottomNav from '../components/BottomNav.vue';
  import CarouselPromos from '../components/CarouselPromos.vue';
  
  const usedCards = [
    { icon: '🛒', text: 'Mis encargos', route: '/encargos' },
    { icon: '💬', text: 'Chat Farmacéutico', route: '/consulta' },
    { icon: '🎁', text: 'Promociones', route: '/promociones' },
  ];
  
  const discoverFeatures = [
    { icon: '⏰', text: 'Recordatorio', route: '/recordatorios' },
    { icon: '✉️', text: 'Newsletter', route: '/recordatorios' },
    { icon: '💰', text: 'Mis puntos', route: '/puntos'},
  ];
  </script>
  
  <style scoped>
  .home {
    padding: 0 0 70px 0;
    min-height: 100vh;
  }
  .greeting {
    font-size: 22px;
    font-weight: 400;
    color: #284e36;
    margin: 20px 0 18px 10px;
  }
  .name {
    font-weight: 700;
    color: #267342;
  }
  .search {
    flex: 1;
    padding: 10px;
    border-radius: 20px;
    border: 1px solid #d0e4d8;
    background: #fff;
    margin-right: 16px;
    font-size: 16px;
    width:100%;
    margin-bottom:20px;
  }
  </style>
  