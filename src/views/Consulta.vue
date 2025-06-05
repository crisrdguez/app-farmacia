<template>
  <div class="chat-container">
    <div class="messages">
      <div v-for="(msg, index) in messages" :key="index" :class="['message', msg.sender]">
        {{ msg.text }}
      </div>
    </div>  <!-- cierre de .messages -->
    <!-- Sugerencias clicables -->
    <div class="suggestions" v-if="suggestions.length">
      <div v-for="(s, i) in suggestions" :key="i" class="suggestion" @click="handleSuggestion(s)">
        {{ s }}
      </div>
    </div>
    <div class="input-area">
      <input v-model="userInput" @keyup.enter="sendMessage" placeholder="Escribe su consulta..." />
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

const suggestions = ref([
  '¿Cuál es la dosis recomendada de ibuprofeno?',
  '¿Cómo debo almacenar la insulina?',
  '¿Cuándo debo desechar los medicamentos caducados?'
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
  // Mostrar mensaje del usuario y limpiar input
  messages.value.push({ sender: 'user', text: question })
  userInput.value = ''
  // Simular procesamiento en tiempo real con retardo
  setTimeout(() => {
    const answer = findAnswerByKeywords(question) || 'Lo siento, no tengo una respuesta para eso.'
    messages.value.push({ sender: 'bot', text: answer })
  }, 1000)
}

function handleSuggestion(text) {
  userInput.value = text
  sendMessage()
}
</script>

<style scoped>
.chat-container {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  height: 80vh;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
}

.messages {
  flex: 1;
  overflow-y: auto;
  margin-bottom: 16px;
}

.message {
  margin: 8px 0;
  padding: 8px 12px;
  border-radius: 16px;
  max-width: 80%;
}

.message.user {
  background-color: #007bff;
  color: white;
  align-self: flex-end;
}

.message.bot {
  background-color: #f1f1f1;
  color: #333;
  align-self: flex-start;
}

.input-area {
  display: flex;
}

.input-area input {
  flex: 1;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-right: 8px;
}

.input-area button {
  padding: 8px 16px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
}

.suggestions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 12px;
}

.suggestion {
  background-color: #e0f3ff;
  color: #007bff;
  padding: 6px 12px;
  border-radius: 12px;
  cursor: pointer;
  font-size: 14px;
  border: 1px solid #007bff;
  transition: background-color 0.2s;
}

.suggestion:hover {
  background-color: #cceeff;
}

@media (max-width: 600px) {
  .chat-container {
    height: 90vh;         /* Ocupa todo el alto de la pantalla */
    padding: 0;            /* Sin padding extra */
    border-radius: 0;      /* Sin bordes redondeados */
    margin: 0;             /* Sin margen */
    max-width: 100vw;      /* Opcional: ocupa todo el ancho */
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
  }
  .messages {
    flex: 1;
    margin-bottom: 0;
    overflow-y: auto;
    min-height: 0;
  }
  .input-area {
    padding: 8px;          /* Espacio interior opcional */
    border-top: 1px solid #ddd;
    background: #fff;      /* Fija el fondo de la caja */
  }
}
</style>