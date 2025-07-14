<template>
  <transition name="slide-down">
    <div v-if="isVisible" class="notification-banner">
      <div class="icon-container">
        <font-awesome-icon icon="plus" class="app-icon" />
      </div>
      <div class="content-container">
        <p class="app-name">Farmacia Grupo 2</p>
        <p class="notification-title">{{ title }}</p>
        <p class="notification-message">{{ message }}</p>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { useNotificationStore } from '@/stores/notification.js'
import { storeToRefs } from 'pinia'

const notificationStore = useNotificationStore()

// --- ESTA ES LA FORMA CORRECTA DE USAR storeToRefs ---
// Desestructuramos las propiedades que necesitamos para que sean reactivas.
const { isVisible, title, message } = storeToRefs(notificationStore)
</script>

<style scoped>
/* Estilo del contenedor principal de la notificación */
.notification-banner {
  position: fixed;
  top: 70px; /* <-- VALOR CORREGIDO */
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 20px);
  max-width: 380px; /* Ancho máximo para pantallas más grandes */
  background-color: rgba(240, 240, 240, 0.95); /* Fondo semitransparente */
  backdrop-filter: blur(10px); /* Efecto de desenfoque del fondo */
  -webkit-backdrop-filter: blur(10px);
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  display: flex;
  padding: 12px;
  z-index: 10000;
  color: #111;
}

.icon-container {
  margin-right: 12px;
  display: flex;
  align-items: flex-start;
}

.app-icon {
  font-size: 20px;
  color: #003559;
}

.content-container {
  flex: 1;
  text-align: left;
}

.app-name {
  font-size: 0.8rem;
  font-weight: 600;
  margin: 0;
  opacity: 0.7;
}

.notification-title {
  font-size: 0.95rem;
  font-weight: bold;
  margin: 2px 0;
}

.notification-message {
  font-size: 0.9rem;
  margin: 0;
  line-height: 1.3;
}

/* Transición para que aparezca y desaparezca suavemente */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.5s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translate(-50%, -100px);
}
</style>