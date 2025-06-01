<template>
    <div>
      <h2>Promociones</h2>
      <ul>
        <li v-for="promo in promociones" :key="promo.id">
          <strong>{{ promo.titulo }}</strong> - {{ promo.desc }}
        </li>
      </ul>
    </div>
  </template>
  <script setup>
  const promociones = [
    { id: 1, titulo: "2x1 en cremas", desc: "Llévate 2 cremas al precio de 1" },
    { id: 2, titulo: "Puntos dobles", desc: "Esta semana tus compras valen el doble" }
  ]
  </script>
  