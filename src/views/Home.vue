<template>
    <div class="home">
      <div class="user-greeting-section"> <div class="user-avatar-container">
        <img src="/user.png" alt="Avatar de usuario" class="user-avatar" />
      </div>
      <div class="greeting-text">
        <div class="greeting">
          Bienvenido, <span class="name">León</span>
        </div>
        <p class="tagline">¿En qué podemos ayudarte hoy?</p> </div>
    </div>
        <div class="search-container">
      <input type="text" placeholder="Búsqueda de productos" class="search"/>
      <font-awesome-icon icon="search" class="search-icon" />
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
  import SectionCards from '../components/SectionCards.vue';
  import FeatureGrid from '../components/FeatureGrid.vue';
  import CarouselPromos from '../components/CarouselPromos.vue';
  
  const usedCards = [
    { icon: 'shopping-cart', text: 'Mis encargos', route: '/encargos' },
    { icon: 'comment-dots', text: 'Chat', route: '/consulta' },
    { icon: 'gift', text: 'Promos', route: '/promociones' },
  ];
  
  const discoverFeatures = [
    { icon: 'clock', text: 'Recordatorio', route: '/recordatorios' },
    { icon: 'envelope', text: 'Newsletter', route: '/newsletter' },
    { icon: 'coins', text: 'Mis puntos', route: '/puntos'},
  ];
  </script>
  <style scoped>
 .home {
  padding: 0 0 70px 0;
  min-height: 100vh;
}


.user-greeting-section {
  display: flex;
  align-items: center;
  margin: 20px 0 18px 0px;
}

.user-avatar-container {
  width: 60px; 
  height: 60px; 
  border-radius: 50%;
  overflow: hidden; 
  margin-right: 15px; 
  border: 2px solid #e0e0e0; 
  flex-shrink: 0; 
}

.user-avatar {
  width: 100%;
  height: 100%;
  object-fit: cover; 
}

.greeting-text {
  flex-grow: 1; 
}

.greeting {
  font-size: 22px;
  font-weight: 400;
  color: #284e36;
  margin: 0; 
}
.name {
  font-weight: 700;
  color: #267342;
}

.tagline {
  font-size: 16px;
  color: #555;
  margin-top: 5px;
}

.search-container {
  position: relative;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}

.search {
  flex: 1;
  padding: 10px 40px 10px 15px;
  border-radius: 20px;
  border: 1px solid #d0e4d8;
  background: #fff;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
}

.search-icon {
  position: absolute;
  right: 15px;
  color: #003559;
  font-size: 18px;
}

.search:focus {
  outline: none;
  border-color: rgb(0, 53, 89); 
}
</style>

  