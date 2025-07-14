// main.js
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia' // <-- 1. ASEGÚRATE DE IMPORTAR createPinia

import App from './App.vue'
import router from './router'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import {
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
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
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

app.use(createPinia()) // <-- 2. ASEGÚRATE DE AÑADIR ESTA LÍNEA ANTES DE USAR EL ROUTER

app.use(router) 
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')