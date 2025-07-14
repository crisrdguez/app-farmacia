// src/stores/notification.js
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useNotificationStore = defineStore('notification', () => {
  // Estado de la notificación
  const isVisible = ref(false)
  const title = ref('')
  const message = ref('')
  let timeoutId = null

  // Acción para mostrar la notificación
  function show(newTitle, newMessage) {
    // Si ya hay una notificación, la cancelamos para mostrar la nueva
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    title.value = newTitle
    message.value = newMessage
    isVisible.value = true

    // Ocultar automáticamente después de 5 segundos
    timeoutId = setTimeout(() => {
      isVisible.value = false
    }, 2500)
  }

  return { isVisible, title, message, show }
})