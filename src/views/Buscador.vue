<template>
  <div class="search-container">
    <h2 class="title">Buscar productos</h2>
    <div class="input-wrapper">
      <input
        v-model="busqueda"
        class="search-input"
        type="text"
        placeholder="Buscar..."
      />
      <svg class="search-icon" viewBox="0 0 24 24">
        <path d="M15.5 14h-.79l-.28-.27a6.477 6.477 0 001.48-5.34C15.47 5.4 12.08 2 8 2S.53 5.4.53 8.39 3.92 14.78 8 14.78c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-7.5 0c-2.48 0-4.5-2.01-4.5-4.49S5.52 5.02 8 5.02s4.5 2.01 4.5 4.49S10.48 14 8 14z"/>
      </svg>
    </div>

    <!-- Resultados de productos por defecto -->
    <ul v-if="resultadosProductos.length" class="results-list">
      <li v-for="prod in resultadosProductos" :key="prod.id" class="result-item">
        <router-link :to="`/producto/${prod.id}`" class="result-link">{{ prod.nombre }}</router-link>
        <button class="order-button" @click="encargar(prod)">Encargar</button>
      </li>
    </ul>

    <!-- Sección de sugerencias -->
    <div v-if="resultadosSugerencias.length" class="suggestions-section">
      <h3 class="subtitle">Sugerencias</h3>
      <ul class="results-list suggestions-list">
        <li v-for="s in resultadosSugerencias" :key="s.id" class="result-item suggestion">
          <span class="result-link">{{ s.nombre }}</span>
          <button class="order-button" @click="encargar(s)">Encargar</button>
        </li>
      </ul>
    </div>

    <p v-if="!resultadosProductos.length && !resultadosSugerencias.length" class="no-results">No se encontraron productos</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const productos = [
  { id: 1, nombre: 'Ibuprofeno 600mg' },
  { id: 2, nombre: 'Vitamina C' },
  { id: 3, nombre: 'Gel hidroalcohólico' },
  { id: 4, nombre: 'Paracetamol 500mg' },
  { id: 5, nombre: 'Antibiótico X 250mg' },
  { id: 6, nombre: 'Jarabe para la tos' },
  { id: 7, nombre: 'Crema antiinflamatoria' },
]

// Array con productos extra para sugerencias
const sugerencias = [
  { id: 101, nombre: 'Café molido' },
  { id: 102, nombre: 'Té verde' },
  { id: 103, nombre: 'Leche sin lactosa' },
  { id: 104, nombre: 'Proteína en polvo' },
]

const busqueda = ref('')

// Computed para productos y sugerencias filtradas
const resultadosProductos = computed(() => {
  const q = busqueda.value.trim().toLowerCase()
  return q
    ? productos.filter(p => p.nombre.toLowerCase().includes(q))
    : productos
})
const resultadosSugerencias = computed(() => {
  const q = busqueda.value.trim().toLowerCase()
  return q
    ? sugerencias.filter(s => s.nombre.toLowerCase().includes(q))
    : []
})

function encargar(producto) {
  // guardar nuevo pedido en localStorage
  const pedidos = JSON.parse(localStorage.getItem('pedidos') || '[]')
  pedidos.push({
    id: producto.id,
    producto: producto.nombre,
    fecha: new Date().toISOString().split('T')[0],
    pendiente: true
  })
  localStorage.setItem('pedidos', JSON.stringify(pedidos))

  alert(`Encargado: ${producto.nombre}`)
}
</script>

<style scoped>
.search-container {
  max-width: 400px;
  margin: 2rem auto;
  padding: 0 1rem;
}
.title {
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 1rem;
}
.input-wrapper {
  position: relative;
}
.search-input {
  width: 100%;
  padding: 0.5rem 2.5rem 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}
.search-icon {
  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
  width: 1rem;
  height: 1rem;
  fill: #888;
}
.results-list {
  list-style: none;
  margin: 0.5rem 0 0;
  padding: 0;
  border: 1px solid #eee;
  border-radius: 4px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}
.result-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #f1f1f1;
}
.result-item:last-child {
  border-bottom: none;
}
.result-link {
  color: #333;
  text-decoration: none;
}
.result-link:hover {
  text-decoration: underline;
}
.order-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.4rem 0.8rem;
  cursor: pointer;
  font-size: 0.875rem;
}
.order-button:hover {
  background-color: #0056b3;
}
.no-results {
  text-align: center;
  margin-top: 0.5rem;
  color: #666;
  font-size: 0.9rem;
}
.subtitle {
  font-size: 1.2rem;
  margin: 1rem 0 0.5rem;
  color: #555;
}
.suggestions-section {
  margin-top: 1.5rem;
}
.suggestions-list .suggestion .result-link {
  font-style: italic;
  color: #888;
}
</style>
