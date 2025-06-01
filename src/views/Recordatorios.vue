<template>
    <div>
      <h2>Recordatorios</h2>
      <form @submit.prevent="addRecordatorio">
        <input v-model="nuevo" placeholder="Ej: Tomar paracetamol a las 8:00" />
        <button>Añadir</button>
      </form>
      <ul>
        <li v-for="(rec, i) in recordatorios" :key="i">{{ rec }}</li>
      </ul>
    </div>
  </template>
  <script setup>
  import { ref } from 'vue'
  const recordatorios = ref(["Tomar ibuprofeno a las 9:00"])
  const nuevo = ref('')
  function addRecordatorio() {
    if (nuevo.value.trim()) {
      recordatorios.value.push(nuevo.value)
      nuevo.value = ''
    }
  }
  </script>
  