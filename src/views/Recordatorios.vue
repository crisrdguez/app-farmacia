<template>
  <div class="recordatorios-container">
    <h2 class="title">Mis Recordatorios</h2>

    <form @submit.prevent="addRecordatorio" class="add-reminder-form">
      <div class="input-group">
        <input v-model="nuevoTexto" type="text" placeholder="Ej: Tomar paracetamol" required />
        <input v-model="nuevoTiempo" type="time" required />
      </div>
      <button type="submit" class="add-btn">Añadir Recordatorio</button>
    </form>

    <ul class="reminder-list">
      <li 
        v-for="recordatorio in recordatorios" 
        :key="recordatorio.id" 
        class="reminder-card"
        :class="{ completed: recordatorio.completed }"
      >
        <input type="checkbox" v-model="recordatorio.completed" class="reminder-checkbox" />
        
        <div class="reminder-content">
          <span class="reminder-text">{{ recordatorio.text }}</span>
          <div class="reminder-time">
            <font-awesome-icon icon="clock" />
            <span>{{ recordatorio.time }}</span>
          </div>
        </div>

        <button @click="deleteRecordatorio(recordatorio.id)" class="delete-btn">
          <font-awesome-icon icon="bell" /> </button>
      </li>
    </ul>
    
    <p v-if="recordatorios.length === 0" class="no-reminders">
      No tienes recordatorios pendientes. ¡Añade uno nuevo!
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useNotificationStore } from '@/stores/notification';

const notificationStore = useNotificationStore();

// Mejoramos la estructura de datos para que cada recordatorio sea un objeto
const recordatorios = ref([
  { id: 1, text: 'Tomar Ibuprofeno', time: '09:00', completed: false },
  { id: 2, text: 'Medir la tensión', time: '10:30', completed: true },
]);

const nuevoTexto = ref('');
const nuevoTiempo = ref('');

function addRecordatorio() {
  if (nuevoTexto.value.trim() === '' || nuevoTiempo.value.trim() === '') {
    return;
  }
  
  const nuevoRecordatorio = {
    id: Date.now(), // ID único basado en la fecha actual
    text: nuevoTexto.value,
    time: nuevoTiempo.value,
    completed: false,
  };
  
  recordatorios.value.unshift(nuevoRecordatorio); // Añadimos al principio de la lista

  // Mostramos la notificación que ya creamos
  notificationStore.show(
    'Recordatorio Añadido', 
    `${nuevoRecordatorio.text} a las ${nuevoRecordatorio.time}`
  );

  // Limpiamos los campos del formulario
  nuevoTexto.value = '';
  nuevoTiempo.value = '';
}

function deleteRecordatorio(id) {
  recordatorios.value = recordatorios.value.filter(r => r.id !== id);
}
</script>

<style scoped>
.recordatorios-container {
  padding: 1rem;
  max-width: 390px;
  margin: 0 auto;
  box-sizing: border-box;
}

.title {
  font-size: 1.6rem;
  font-weight: 700;
  color: #284e36;
  margin-bottom: 1.5rem;
  text-align: center;
}

/* Formulario */
.add-reminder-form {
  background: #fff;
  padding: 1rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}

.input-group {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.input-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 0.95rem;
}

.input-group input[type="text"] {
  flex-grow: 3;
}
.input-group input[type="time"] {
  flex-grow: 1;
}

.add-btn {
  width: 100%;
  padding: 0.8rem;
  font-size: 1rem;
  font-weight: 600;
  background-color: #003559;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.add-btn:hover {
  background-color: #005a8d;
}

/* Lista de recordatorios */
.reminder-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.reminder-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  background-color: #fff;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}

.reminder-content {
  flex-grow: 1;
}

.reminder-text {
  font-size: 1rem;
  font-weight: 500;
  color: #333;
  text-decoration: none;
  transition: all 0.3s ease;
}

.reminder-time {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #ff1378;
  font-weight: 600;
  margin-top: 4px;
}

.reminder-checkbox {
  /* Aumentamos el tamaño del checkbox para que sea más fácil de pulsar */
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.delete-btn {
  background: none;
  border: none;
  color: #aaa;
  cursor: pointer;
  font-size: 1.2rem;
  transition: color 0.2s;
}

.delete-btn:hover {
  color: #d9534f;
}

/* Estilos para recordatorios completados */
.reminder-card.completed {
  background-color: #f1f1f1;
  opacity: 0.7;
}

.reminder-card.completed .reminder-text {
  text-decoration: line-through;
  color: #888;
}

.no-reminders {
  text-align: center;
  margin-top: 2rem;
  color: #888;
}
</style>