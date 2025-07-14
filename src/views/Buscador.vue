<template>
  <div class="search-container">
    <h2 class="title">Buscar productos</h2>
    <div class="input-wrapper">
      <input
        v-model="busqueda"
        class="search-input"
        type="text"
        placeholder="Buscar por nombre..."
      />
      <font-awesome-icon icon="search" class="search-icon" />
    </div>

    <p v-if="busqueda && !resultadosFiltrados.length" class="no-results">
      No se encontraron productos para "{{ busqueda }}"
    </p>

    <ul v-if="resultadosFiltrados.length > 0" class="results-list">
      <li v-for="prod in resultadosFiltrados" :key="prod.id" class="result-item">
        <div class="product-info">
          <span class="product-icon">💊</span>
          <router-link :to="`/producto/${prod.id}`" class="result-link">{{ prod.nombre }}</router-link>
        </div>
        <button class="order-button" @click="encargosStore.encargarProducto(prod)">Encargar</button>
      </li>
    </ul>

    <div v-if="!busqueda" class="suggestions-section">
      <h3 class="subtitle">También te puede interesar</h3>
      <ul class="results-list suggestions-list">
        <li v-for="s in sugerencias" :key="s.id" class="result-item suggestion">
           <div class="product-info">
             <span class="product-icon">✨</span>
             <span class="result-link">{{ s.nombre }}</span>
           </div>
          <button class="order-button" @click="encargosStore.encargarProducto(s)">Encargar</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
// 1. Importamos nuestro nuevo store de encargos
import { useEncargosStore } from '@/stores/encargos';

// 2. Inicializamos el store
const encargosStore = useEncargosStore();

// Datos de ejemplo para la demo
const productos = ref([
  { id: 1, nombre: 'Ibuprofeno 600mg' },
  { id: 2, nombre: 'Vitamina C efervescente' },
  { id: 3, nombre: 'Gel hidroalcohólico 500ml' },
  { id: 4, nombre: 'Paracetamol 500mg' },
  { id: 5, nombre: 'Amoxicilina 250mg' },
  { id: 6, nombre: 'Jarabe para la tos seca' },
  { id: 7, nombre: 'Crema antiinflamatoria' },
]);

const sugerencias = ref([
  { id: 101, nombre: 'Mascarillas FFP2' },
  { id: 102, nombre: 'Tiritas infantiles' },
  { id: 103, nombre: 'Leche sin lactosa para bebé' },
]);

const busqueda = ref('');

// Unimos los productos y sugerencias en una sola lista para la búsqueda
const todosLosProductos = computed(() => [...productos.value, ...sugerencias.value]);

// Computed property para filtrar los resultados en tiempo real
const resultadosFiltrados = computed(() => {
  const q = busqueda.value.trim().toLowerCase();
  if (!q) {
    return []; // No mostrar nada si no hay búsqueda
  }
  return todosLosProductos.value.filter(p => p.nombre.toLowerCase().includes(q));
});

</script>

<style scoped>
.search-container {
  max-width: 400px;
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
.input-wrapper {
  position: relative;
  margin-bottom: 1.5rem;
}
.search-input {
  width: 100%;
  padding: 0.8rem 2.5rem 0.8rem 1rem;
  border: 1px solid #ccc;
  border-radius: 25px;
  font-size: 1rem;
}
.search-input:focus {
  outline: none;
  border-color: #06ca9c;
  box-shadow: 0 0 0 3px rgba(6, 202, 156, 0.2);
}
.search-icon {
  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
  width: 1rem;
  height: 1rem;
  color: #888;
}
.results-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.result-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}
.product-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.product-icon {
  font-size: 1.2rem;
}
.result-link {
  color: #333;
  text-decoration: none;
  font-weight: 500;
}
.order-button {
  background-color: #ff1378;
  color: #fff;
  border: none;
  border-radius: 20px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 600;
  transition: background-color 0.2s;
}
.order-button:hover {
  background-color: #e60067;
}
.no-results {
  text-align: center;
  margin-top: 1rem;
  color: #666;
  font-size: 0.9rem;
  background-color: #fff8e1;
  padding: 0.75rem;
  border-radius: 8px;
}
.subtitle {
  font-size: 1.2rem;
  margin: 1.5rem 0 1rem 0;
  color: #555;
  font-weight: 600;
}
</style>