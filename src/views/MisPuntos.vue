<template>
    <div>
      <h2>Mis puntos</h2>
      <p>Total acumulado: <strong>{{ puntos }}</strong> puntos</p>
      <p>Equivalen a: <strong>{{ puntos * 0.05 }} €</strong> de descuento</p>
    </div>
  </template>
  <script setup>
  const puntos = 250 // Mockeado
  </script>
  