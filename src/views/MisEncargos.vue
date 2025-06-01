<template>
    <div>
      <h2>Mis encargos</h2>
      <ul>
        <li v-for="pedido in pedidos" :key="pedido.id">
          <strong>{{ pedido.producto }}</strong> <br>
          Fecha recogida: {{ pedido.fecha }} <br>
          <span v-if="pedido.pendiente">Pendiente de recoger</span>
          <span v-else>Recogido</span>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  const pedidos = [
    { id: 1, producto: "Ibuprofeno 600mg", fecha: "2025-06-02", pendiente: true },
    { id: 2, producto: "Vitamina C", fecha: "2025-05-30", pendiente: false },
  ]
  </script>
  