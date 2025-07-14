<template>
  <div class="orders-container">
    <h2 class="title">Mis encargos</h2>

    <ul v-if="pedidos.length > 0" class="orders-list">
      <li
        v-for="pedido in pedidos"
        :key="pedido.id"
        class="order-item"
        @touchstart="startSwipe($event, pedido.id)"
        @touchmove="onSwipeMove($event)"
        @touchend="endSwipe"
        :style="{
          transform: `translateX(${offsets[pedido.id] || 0}px)`,
          backgroundColor: offsets[pedido.id] > 50 ? '#ffebee' : '#fff' /* Color rojo suave al deslizar */
        }"
      >
        <div class="order-info">
          <strong class="order-product">{{ pedido.producto }}</strong>
          <span class="order-date">Fecha de encargo: {{ pedido.fecha }}</span>
          <span :class="['order-status', pedido.pendiente ? 'status-pendiente' : 'status-recogido']">
            {{ pedido.pendiente ? 'Pendiente de recoger' : 'Recogido' }}
          </span>
        </div>
        
        <button v-if="pedido.pendiente" @click="marcarComoRecogido(pedido)" class="mark-button">
          Marcar como recogido
        </button>
      </li>
    </ul>

    <p v-else class="no-orders">
      Aún no tienes encargos. Puedes añadir uno desde la sección de Productos.
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
// 1. Importamos el store de notificaciones
import { useNotificationStore } from '@/stores/notification';

// 2. Inicializamos el store
const notificationStore = useNotificationStore();

const pedidos = ref([]);
const offsets = reactive({});

onMounted(() => {
  const saved = localStorage.getItem('pedidos');
  pedidos.value = saved ? JSON.parse(saved) : [];
});

// --- 3. IMPLEMENTAMOS LA FUNCIÓN ---
function marcarComoRecogido(pedido) {
  // Buscamos el pedido en la lista
  const pedidoAModificar = pedidos.value.find(p => p.id === pedido.id);
  
  if (pedidoAModificar) {
    // Cambiamos su estado
    pedidoAModificar.pendiente = false;
    
    // Guardamos la lista actualizada en localStorage
    localStorage.setItem('pedidos', JSON.stringify(pedidos.value));
    
    // Mostramos la notificación
    notificationStore.show(
      'Encargo Recogido',
      `El producto "${pedido.producto}" ha sido marcado como recogido.`
    );
  }
}


// --- Lógica existente para deslizar y eliminar ---
const startX = ref(0);
const swipingId = ref(null);
const MAX_SWIPE = 250;
const DELETE_THRESHOLD = 200;

function startSwipe(event, id) {
  startX.value = event.touches[0].clientX;
  swipingId.value = id;
  offsets[id] = 0;
}

function onSwipeMove(event) {
  if (swipingId.value === null) return;
  const deltaX = event.touches[0].clientX - startX.value;
  const id = swipingId.value;
  // Permitimos deslizar solo hacia la izquierda para eliminar
  const moveX = Math.min(0, deltaX);
  
  offsets[id] = moveX < -MAX_SWIPE ? -MAX_SWIPE : moveX;

  if (moveX < -DELETE_THRESHOLD) {
    eliminar(id);
    swipingId.value = null;
  }
}

function endSwipe() {
  if (swipingId.value !== null) {
    offsets[swipingId.value] = 0;
    swipingId.value = null;
  }
}

function eliminar(id) {
  pedidos.value = pedidos.value.filter(p => p.id !== id);
  localStorage.setItem('pedidos', JSON.stringify(pedidos.value));
  notificationStore.show('Encargo Eliminado', 'El pedido ha sido eliminado de tu lista.');
}
</script>

<style scoped>
.orders-container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 0 1rem;
}
.title {
  font-size: 1.6rem;
  font-weight: 700;
  color: #284e36;
  text-align: center;
  margin-bottom: 1.5rem;
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
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  overflow: hidden; /* Importante para que el fondo no se salga */
}
.order-info {
  display: flex;
  flex-direction: column;
}
.order-product {
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
  font-weight: 600;
  color: #333;
}
.order-date {
  font-size: 0.85rem;
  color: #888;
  margin-bottom: 0.75rem;
}
.order-status {
  font-size: 0.875rem;
  font-weight: 500;
  padding: 4px 8px;
  border-radius: 8px;
  width: fit-content;
}
.status-pendiente {
  color: #d9534f;
  background-color: #f8d7da;
}
.status-recogido {
  color: #38761d;
  background-color: #d9ead3;
}
.mark-button {
  background-color: #06ca9c;
  color: #fff;
  border: none;
  border-radius: 20px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 600;
  white-space: nowrap; /* Evita que el texto se rompa */
  transition: background-color 0.2s;
}
.mark-button:hover {
  background-color: #05a27a;
}
.no-orders {
  text-align: center;
  margin-top: 2rem;
  color: #888;
}
</style>