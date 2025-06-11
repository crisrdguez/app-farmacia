<template>
  <div class="chat-container">
    <div class="messages">
      <div v-for="(msg, index) in messages" :key="index" :class="['message', msg.sender]">
        {{ msg.text }}
      </div>
      <div v-if="isBotTyping" class="message bot typing-indicator">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div> <div class="suggestions" v-if="suggestions.length">
      <div v-for="(s, i) in suggestions" :key="i" class="suggestion" @click="handleSuggestion(s)">
        {{ s }}
      </div>
    </div>
    <div class="input-area">
      <input v-model="userInput" @keyup.enter="sendMessage" class="search-chat" placeholder="Escribe su consulta..." />
      <button @click="sendMessage">Enviar</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Papa from 'papaparse'

const csvData = ref([])
const messages = ref([])
const userInput = ref('')
const isBotTyping = ref(false) // <-- Nueva variable de estado para el indicador de escritura

const suggestions = ref([
  '¿Cómo debo almacenar la insulina?',
  '¿Cuál es la dosis recomendada de ibuprofeno?'
])

onMounted(() => {
  // Mensaje de bienvenida con preguntas sugeridas
  messages.value.push({
    sender: 'bot',
    text: `Hola, soy el chatbot farmacéutico, ¿en qué te puedo ayudar?`
  })

  Papa.parse('/faqs.csv', {
    download: true,
    header: true,
    complete: (results) => {
      csvData.value = results.data
    }
  })
})

// Función para encontrar respuesta por coincidencia de palabras clave
function findAnswerByKeywords(question) {
  const inputWords = question.toLowerCase().match(/\w+/g) || []
  let bestMatch = null
  let bestScore = 0
  csvData.value.forEach(row => {
    const rowWords = (row.question || '').toLowerCase().match(/\w+/g) || []
    const common = inputWords.filter(w => rowWords.includes(w))
    if (common.length > bestScore) {
      bestScore = common.length
      bestMatch = row
    }
  })
  return bestMatch && bestScore > 0 ? bestMatch.answer : null
}

function sendMessage() {
  const question = userInput.value.trim()
  if (!question) return

  // 1. Mostrar mensaje del usuario
  messages.value.push({ sender: 'user', text: question })
  userInput.value = ''

  // 2. Activar el indicador de escritura del bot inmediatamente
  isBotTyping.value = true

  // 3. Simular procesamiento en tiempo real con retardo
  // (Puedes ajustar este retardo para que la simulación sea más realista)
  setTimeout(() => {
    const answer = findAnswerByKeywords(question) || 'Lo siento, no tengo una respuesta para eso.'
    messages.value.push({ sender: 'bot', text: answer })

    // 4. Desactivar el indicador de escritura una vez que la respuesta del bot aparece
    isBotTyping.value = false

    // Opcional: Desplazarse al final de los mensajes para ver el indicador y la respuesta
    // Necesitarías una referencia al div de mensajes para esto.
    // Ej: const messagesContainer = ref(null) y <div ref="messagesContainer" class="messages">
    // messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }, 1500) // Un poco más de tiempo para que se vea el efecto del spinner
}

function handleSuggestion(text) {
  userInput.value = text
  sendMessage()
}
</script>

<style scoped>
/* ... (Tus estilos existentes) ... */

.chat-container {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  height: 60vh;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  box-sizing: border-box; /* Asegura que el padding no añada ancho extra */
}

.messages {
  flex: 1;
  overflow-y: auto;
  margin-bottom: 16px;
  padding-right: 5px; /* Para que la barra de scroll no se superponga al contenido */
}

.message {
  margin: 4px;
  padding: 4px 8px;
  border-radius: 16px;
  max-width: 70%; /* Ajusta el ancho máximo para mensajes individuales */
  word-wrap: break-word; /* Para asegurar que el texto largo se rompa */
}

.message.user {
  background-color: #003559;
  color: white;
  align-self: flex-end; /* Alinea los mensajes del usuario a la derecha */
  margin-left: auto; /* Empuja el mensaje a la derecha */
}

.message.bot {
  background-color: #f1f1f1;
  color: #333;
  align-self: flex-start; /* Alinea los mensajes del bot a la izquierda */
  margin-right: auto; /* Empuja el mensaje a la izquierda */
}

.input-area {
  display: flex;
  margin-top: 8px; /* Espacio entre sugerencias/mensajes y el área de input */
}

.input-area input {
  flex: 1;
  padding: 12px;
  border-radius: 20px; /* Borde más redondeado para el input de chat */
  border: 1px solid #ccc;
  margin-right: 8px;
  font-size: 14px;
}

.input-area button {
  padding: 8px 16px;
  border: none;
  background-color: #ff1378;
  color: white;
  border-radius: 20px; /* Borde más redondeado para el botón */
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s ease;
}

.input-area button:hover {
  background-color: #e60067;
}

.suggestions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 4px;
  padding-top: 8px; /* Añadido padding para que el border-top no pegue */
  border-top: 1px solid #06ca9c;
}

.suggestion {
  background: rgba(6, 202, 156, 0.1);
  color: #003559;
  padding: 6px 12px; /* Un poco más de padding para que se vea mejor */
  border-radius: 16px; /* Bordes más redondeados */
  cursor: pointer;
  font-size: 13px; /* Tamaño de fuente ligeramente más pequeño */
  border: 1px solid #003559;
  transition: background-color 0.2s, transform 0.1s;
  margin: 6px;
}

.suggestion:hover {
  background-color: rgba(6, 202, 156, 0.3);
  transform: translateY(-1px); /* Pequeño efecto al pasar el ratón */
}

/* ------------------------------------------- */
/* ESTILOS PARA EL INDICADOR DE ESCRITURA (SPINNER) */
/* ------------------------------------------- */
.typing-indicator {
  background-color: #f1f1f1; /* Mismo fondo que los mensajes del bot */
  padding: 8px 15px; /* Un poco más de padding */
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center; /* Centrar los puntos si es necesario */
  margin: 8px;
  width: fit-content; /* Para que el fondo solo ocupe el espacio de los puntos */
  margin-right: auto; /* Alinearlo a la izquierda como un mensaje de bot */
}

.typing-indicator span {
  display: inline-block;
  width: 8px; /* Tamaño de cada punto */
  height: 8px;
  background-color: #003559; /* Color de los puntos */
  border-radius: 50%;
  margin: 0 3px; /* Espacio entre puntos */
  animation: bounce 0.6s infinite alternate; /* Animación de rebote */
}

.typing-indicator span:nth-child(2) {
  animation-delay: 0.2s; /* Retraso para el segundo punto */
}

.typing-indicator span:nth-child(3) {
  animation-delay: 0.4s; /* Retraso para el tercer punto */
}

@keyframes bounce {
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(-5px); /* Cuánto suben los puntos */
  }
}

/* ------------------------------------------- */
/* MEDIA QUERIES (Asegúrate de que tus estilos existan antes de esto) */
/* ------------------------------------------- */
@media (max-width: 600px) {
  .chat-container {
    height: 83vh;
    padding: 0;
    border-radius: 0;
    margin: 0;
    max-width: 100vw;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
  }
  .messages {
    flex: 1;
    height: 300px;
    margin-bottom: 0;
    overflow-y: auto;
    min-height: 0;
    padding: 5px; /* Añade padding para el contenido en móvil */
  }
  .input-area {
    padding: 8px;
    border-top: 1px solid #ddd;
    background: #fff;
  }
  .search-chat:focus {
    outline: none;
    border-color: rgb(0, 53, 89);
  }
}
</style>