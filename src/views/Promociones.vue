<template>
  <div class="promociones-container">
    <h2 class="title">Promociones y Ofertas</h2>
    <div class="promo-list">
      <div v-for="promo in promociones" :key="promo.id" class="promo-card">
        <img :src="promo.img" :alt="promo.titulo" class="promo-image" />
        <div class="promo-content">
          <h3 class="promo-title">{{ promo.titulo }}</h3>
          <p class="promo-desc">{{ promo.desc }}</p>
          <button class="promo-button">Ver más</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Usamos datos de ejemplo con imágenes como en el carrusel para que sea más visual.
// Estos datos vendrían de un API en una aplicación real.
const promociones = ref([
  {
    id: 1,
    titulo: 'Descuentos en Solares',
    desc: 'Hasta 50% de descuento en una selección de protectores solares. ¡Prepara tu piel para el verano!',
    img: '/imagensol.png'
  },
  {
    id: 2,
    titulo: '2x1 en Cremas Faciales',
    desc: 'Llévate dos de tus cremas favoritas al precio de una. Hidratación y cuidado al mejor precio.',
    img: '/imagen2x1.png'
  },
  {
    id: 3,
    titulo: 'Acumula 300 Puntos',
    desc: 'Consigue 300 puntos de fidelidad con la compra de cualquier pack de vitaminas y minerales.',
    img: '/imagenpuntos.png'
  },
  {
    id: 4,
    titulo: 'Salud Bucal',
    desc: '25% de descuento en todos los productos de higiene bucal: cepillos, pastas y enjuagues.',
    // Puedes añadir una nueva imagen en la carpeta /public si lo deseas
    img: '/imagen2x1.png'
  }
]);
</script>

<style scoped>
.promociones-container {
  padding: 1rem;
  max-width: 390px;
  margin: 0 auto;
  box-sizing: border-box;
}

.title {
  font-size: 1.6rem;
  font-weight: 700;
  color: #284e36;
  margin-bottom: 1.5rem;
  text-align: center;
}

.promo-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem; /* Espacio entre las tarjetas */
}

.promo-card {
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease-in-out;
}

.promo-card:hover {
  transform: translateY(-5px);
}

.promo-image {
  width: 100%;
  height: 160px; /* Altura fija para la imagen */
  object-fit: cover;
}

.promo-content {
  padding: 1rem;
  text-align: left;
}

.promo-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #003559;
  margin: 0 0 0.5rem 0;
}

.promo-desc {
  font-size: 0.95rem;
  color: #555;
  line-height: 1.4;
  margin-bottom: 1rem;
}

.promo-button {
  background-color: #ff1378;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 0.6rem 1.2rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.2s;
}

.promo-button:hover {
  background-color: #e60067;
}
</style>