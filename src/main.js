// main.js
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import {
  faShoppingCart, // Mis encargos
  faCommentDots,  // Chat Farmacéutico / Chat en footer
  faGift,         // Promociones
  faClock,        // Recordatorio
  faEnvelope,     // Newsletter
  faCoins,        // Mis puntos
  faUser,         // Ícono de usuario en TopBar
  faBell,         // Ícono de campana en TopBar
  faSearch,       // Ícono de búsqueda
  faHome,         // Ícono de inicio en footer
  faPills,        // Ícono de productos en footer (puedes elegir otro como faFlask, faPrescriptionBottle)
  faPlus,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
// ¡ESTA LÍNEA ES ESENCIAL Y FALTABA!
library.add(
  faShoppingCart,
  faCommentDots,
  faGift,
  faClock,
  faEnvelope,
  faCoins,
  faUser,
  faBell,
  faSearch,
  faHome,
  faPills,
  faPlus,
  faUserCircle
)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon) // Componente registrado globalmente
app.use(router) // Si usas Vue Router
app.mount('#app')