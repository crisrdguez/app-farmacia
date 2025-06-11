<template>
  <div class="orders-container">
    <h2 class="title">Mis encargos</h2>
    <ul class="orders-list">
      <li
        v-for="pedido in pedidos"
        :key="pedido.id"
        class="order-item"
        @touchstart="startSwipe($event, pedido.id)"
        @touchmove="onSwipeMove($event)"
        @touchend="endSwipe"
        :style="{
          transform: `translateX(${offsets[ pedido.id ] || 0 }px)` ,
          backgroundColor: offsets[ pedido.id ] > 0 ? '#f8d7da' : '#fff'
        }"
      >
        <div class="order-info">
          <strong class="order-product">{{ pedido.producto }}</strong>
          <span class="order-date">Fecha recogida: {{ pedido.fecha }}</span>
          <span :class="['order-status', pedido.pendiente ? 'status-pendiente' : 'status-recogido']">
            {{ pedido.pendiente ? 'Pendiente de recoger' : 'Recogido' }}
          </span>
        </div>
        <button v-if="pedido.pendiente" @click="marcarRecogido(pedido.id)" class="mark-button">
          Marcar como recogido
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'

const pedidos = ref([])
const offsets = reactive({})

// definir nuevos parámetros de swipe
const MAX_SWIPE = 250  // límite visual de desplazamiento
const DELETE_THRESHOLD = 200  // umbral para eliminar

onMounted(() => {
  const saved = localStorage.getItem('pedidos')
  pedidos.value = saved ? JSON.parse(saved) : []
})

// Variables para swipe
const startX = ref(0)
const swipingId = ref(null)

// Iniciar swipe
function startSwipe(event, id) {
  startX.value = event.touches[0].clientX
  swipingId.value = id
  offsets[id] = 0
}

// Detectar movimiento y mostrar feedback visual
function onSwipeMove(event) {
  if (swipingId.value === null) return
  const deltaX = event.touches[0].clientX - startX.value
  const id = swipingId.value
  const moveX = Math.max(0, deltaX)
  // usar límite visual extendido
  offsets[id] = moveX > MAX_SWIPE ? MAX_SWIPE : moveX

  // usar umbral extendido para eliminar
  if (moveX > DELETE_THRESHOLD) {
    eliminar(id)
    swipingId.value = null
  }
}

function endSwipe() {
  if (swipingId.value !== null) {
    offsets[ swipingId.value ] = 0
    swipingId.value = null
  }
}

// Eliminar pedido
function eliminar(id) {
  pedidos.value = pedidos.value.filter(p => p.id !== id)
  localStorage.setItem('pedidos', JSON.stringify(pedidos.value))
}
</script>

<style scoped>
.orders-container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 0 1rem;
}
.title {
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 1rem;
}
.orders-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.order-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  transition: transform 0.3s ease, background-color 0.3s ease;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
.order-info {
  display: flex;
  flex-direction: column;
}
.order-product {
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
}
.order-date {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
}
.order-status {
  font-size: 0.875rem;
}
.status-pendiente {
  color: #d9534f;
}
.status-recogido {
  color: #5cb85c;
}
.mark-button {
  background: transparent;
  border: none;
  color: #007bff;
  cursor: pointer;
  font-size: 0.875rem;
}
.mark-button:hover {
  text-decoration: underline;
}
</style>
