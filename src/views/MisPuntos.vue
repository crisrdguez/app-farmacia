<template>
  <div class="puntos-container">
    <div class="puntos-card">
      <p class="card-subtitle">Tu Saldo Actual</p>
      <h1 class="puntos-total">{{ puntos }}</h1>
      <p class="puntos-label">puntos</p>
      <p class="equivalencia">Equivalente a <strong>{{ valorEnEuros }} €</strong> de descuento</p>
    </div>

    <div class="historial-section">
      <h3 class="section-title">Movimientos Recientes</h3>
      <ul class="historial-list">
        <li v-for="mov in movimientos" :key="mov.id" class="historial-item">
          <div class="item-info">
            <span class="item-desc">{{ mov.desc }}</span>
            <span class="item-fecha">{{ mov.fecha }}</span>
          </div>
          <span :class="['item-puntos', mov.tipo === 'ganados' ? 'puntos-ganados' : 'puntos-canjeados']">
            {{ mov.tipo === 'ganados' ? '+' : '-' }}{{ mov.cantidad }}
          </span>
        </li>
      </ul>
    </div>

    <div class="info-card">
        <h3 class="info-title">¿Cómo canjear tus puntos?</h3>
        <p class="info-text">
            Puedes usar tus puntos para obtener descuentos directos en tus compras. Simplemente, avisa en caja antes de pagar y te aplicaremos el descuento correspondiente.
        </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// --- DATOS DE DEMO ---
// En una app real, estos datos vendrían del perfil del usuario.
const puntos = ref(250);
const TASA_CONVERSION = 0.05; // 1 punto = 0.05€

const valorEnEuros = computed(() => {
  return (puntos.value * TASA_CONVERSION).toFixed(2);
});

const movimientos = ref([
  { id: 1, desc: 'Compra de parafarmacia', fecha: '10/06/2025', cantidad: 15, tipo: 'ganados' },
  { id: 2, desc: 'Canjeados por descuento', fecha: '28/05/2025', cantidad: 100, tipo: 'canjeados' },
  { id: 3, desc: 'Promoción de bienvenida', fecha: '15/05/2025', cantidad: 50, tipo: 'ganados' },
  { id: 4, desc: 'Compra con receta', fecha: '12/05/2025', cantidad: 35, tipo: 'ganados' },
]);

</script>

<style scoped>
.puntos-container {
  padding: 1.5rem 1rem;
  max-width: 390px;
  margin: 0 auto;
  box-sizing: border-box;
  background-color: #f8f9fa;
  min-height: 100%;
}

.puntos-card {
  background: linear-gradient(45deg, #003559, #005a8d);
  color: white;
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 8px 20px rgba(0, 89, 141, 0.3);
  margin-bottom: 2rem;
}

.card-subtitle {
  margin: 0;
  font-size: 1rem;
  opacity: 0.8;
}

.puntos-total {
  font-size: 5rem;
  font-weight: 700;
  margin: 0;
  line-height: 1;
}

.puntos-label {
    margin: -0.5rem 0 1rem 0;
    font-size: 1.2rem;
    font-weight: 300;
}

.equivalencia {
  margin: 0;
  font-size: 1rem;
  background-color: rgba(255, 255, 255, 0.15);
  padding: 0.5rem;
  border-radius: 12px;
  display: inline-block;
}

.historial-section {
  margin-bottom: 2rem;
}

.section-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #284e36;
  margin-bottom: 1rem;
}

.historial-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.historial-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);
}

.item-info {
  display: flex;
  flex-direction: column;
}

.item-desc {
  font-weight: 500;
  color: #333;
}

.item-fecha {
  font-size: 0.8rem;
  color: #888;
}

.item-puntos {
  font-size: 1.2rem;
  font-weight: 700;
}

.puntos-ganados {
  color: #06ca9c; /* Verde de tu paleta */
}

.puntos-canjeados {
  color: #d9534f; /* Rojo de tu paleta */
}

.info-card {
    background-color: #eaf7f4; /* Un verde muy claro */
    border-radius: 16px;
    padding: 1.5rem;
    border: 1px solid #b8dcc8;
}

.info-title {
    color: #23704b;
    font-size: 1.1rem;
    margin-top: 0;
    margin-bottom: 0.5rem;
}

.info-text {
    color: #28513d;
    line-height: 1.5;
    margin: 0;
    font-size: 0.9rem;
}
</style>