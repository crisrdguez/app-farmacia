<template>
    <div>
      <h2>Buscar productos</h2>
      <input v-model="busqueda" @input="filtrar" placeholder="Buscar..."/>
      <ul>
        <li v-for="prod in resultados" :key="prod.id">
          <router-link :to="`/producto/${prod.id}`">{{ prod.nombre }}</router-link>
          <button @click="encargar(prod)">Encargar</button>
        </li>
      </ul>
    </div>
  </template>
  <script setup>
  import { ref } from 'vue'
  const productos = [
    { id: 1, nombre: "Ibuprofeno 600mg" },
    { id: 2, nombre: "Vitamina C" },
    { id: 3, nombre: "Gel hidroalcohólico" },
  ]
  const busqueda = ref("")
  const resultados = ref(productos)
  function filtrar() {
    resultados.value = productos.filter(p =>
      p.nombre.toLowerCase().includes(busqueda.value.toLowerCase())
    )
  }
  function encargar(producto) {
    alert("Encargado: " + producto.nombre)
  }
  </script>
  