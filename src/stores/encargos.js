// src/stores/encargos.js
import { ref, onMounted } from 'vue';
import { defineStore } from 'pinia';
import { useNotificationStore } from './notification'; // Importamos el store de notificaciones

export const useEncargosStore = defineStore('encargos', () => {
  const pedidos = ref([]);
  const notificationStore = useNotificationStore(); // Usamos el otro store

  // Cargar los pedidos desde localStorage cuando el store se inicia
  onMounted(() => {
    const saved = localStorage.getItem('pedidos');
    if (saved) {
      pedidos.value = JSON.parse(saved);
    }
  });

  // Función para guardar los cambios en localStorage
  function guardarEnLocalStorage() {
    localStorage.setItem('pedidos', JSON.stringify(pedidos.value));
  }

  // LA FUNCIÓN PRINCIPAL QUE USAREMOS
  function encargarProducto(producto) {
    // Añadimos el nuevo pedido a la lista
    pedidos.value.unshift({ // unshift lo añade al principio
      id: producto.id,
      producto: producto.nombre,
      fecha: new Date().toISOString().split('T')[0],
      pendiente: true
    });

    // Guardamos los cambios
    guardarEnLocalStorage();

    // ¡Lanzamos la notificación!
    notificationStore.show(
      'Producto Encargado',
      `"${producto.nombre}" se ha añadido a tus encargos.`
    );
  }

  // Exponemos las variables y funciones que necesitamos
  return { pedidos, encargarProducto };
});