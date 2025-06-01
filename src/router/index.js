import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import MisEncargos from '../views/MisEncargos.vue'
import Promociones from '../views/Promociones.vue'
import Recordatorios from '../views/Recordatorios.vue'
import MisPuntos from '../views/MisPuntos.vue'
import Buscador from '../views/Buscador.vue'
import ProductoDetalle from '../views/ProductoDetalle.vue'
import Consulta from '../views/Consulta.vue'

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/encargos', name: 'MisEncargos', component: MisEncargos },
    { path: '/promociones', name: 'Promociones', component: Promociones },
    { path: '/recordatorios', name: 'Recordatorios', component: Recordatorios },
    { path: '/puntos', name: 'MisPuntos', component: MisPuntos },
    { path: '/consulta', name: 'Consulta', component: Consulta },
    { path: '/buscar', name: 'Buscador', component: Buscador },
    { path: '/producto/:id', name: 'ProductoDetalle', component: ProductoDetalle }
  ]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
