<template>
  <div class="newsletter-container">
    <div v-if="!showExample" class="newsletter-card">

      <div v-if="!isSubscribed" class="form-state">
        <div class="icon-wrapper">
          <font-awesome-icon icon="envelope" />
        </div>
        <h2 class="title">Suscríbete a nuestro boletín</h2>
        <p class="description">
          Recibe en tu correo ofertas exclusivas, consejos de salud de nuestros farmacéuticos y las últimas novedades.
        </p>
        <form @submit.prevent="handleSubscription" class="subscription-form">
          <input 
            v-model="email" 
            type="email" 
            placeholder="Tu correo electrónico" 
            required 
            class="email-input"
          />
          <button type="submit" class="submit-button">Suscribirme</button>
        </form>
      </div>

      <div v-else class="success-state">
         <div class="icon-wrapper success">
           <font-awesome-icon icon="bell" />
        </div>
        <h2 class="title">¡Inscripción Exitosa!</h2>
        <p class="description">
          Gracias por unirte. Ya puedes ver un ejemplo de nuestro último boletín de salud.
        </p>
        <button @click="showExample = true" class="cta-button">Ver última newsletter</button>
      </div>

    </div>

    <div v-else class="newsletter-example">
      <div class="newsletter-header">
        <h3>Boletín de Salud - Farmacia Grupo 2</h3>
        <p>Junio 2025</p>
      </div>
      
      <img src="/imagensol.png" alt="Protección solar" class="newsletter-image">
      
      <div class="newsletter-content">
        <h2>Guía Esencial de Protección Solar</h2>
        <p>Con la llegada del verano, es crucial proteger nuestra piel de los efectos dañinos del sol. No se trata solo de evitar quemaduras, sino de prevenir el envejecimiento prematuro y reducir el riesgo de cáncer de piel. Recuerda aplicar protector solar con un SPF de 30 o superior 20 minutos antes de salir y reaplicar cada 2 horas.</p>
        
        <h3>Consejo del Mes: La Hidratación</h3>
        <p>Beber suficiente agua es tan importante como protegerse por fuera. Mantenerse hidratado ayuda a que tu piel conserve su elasticidad y barrera protectora natural. ¡Intenta beber al menos 2 litros de agua al día!</p>

        <div class="promo-section">
          <h4>Producto Destacado</h4>
          <p>Este mes, aprovecha un <strong>20% de descuento</strong> en toda nuestra línea de fotoprotectores Isdin. ¡Pregúntanos!</p>
          <router-link to="/promociones" class="promo-button">Ver todas las promociones</router-link>
        </div>
      </div>

      <div class="newsletter-footer">
        <p>Sigue nuestros consejos en redes sociales.</p>
        <button @click="showExample = false; isSubscribed = false" class="back-button">Volver al formulario</button>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue';

const email = ref('');
const isSubscribed = ref(false);
const showExample = ref(false); // Nuevo estado para controlar la vista del ejemplo

function handleSubscription() {
  if (email.value.trim() !== '' && email.value.includes('@')) {
    isSubscribed.value = true;
  }
}
</script>

<style scoped>
/* ... (Estilos existentes del .newsletter-card, .title, etc. no cambian) ... */

.newsletter-container {
  padding: 2rem 1rem;
  box-sizing: border-box;
}

.newsletter-card {
  background: #fff;
  padding: 2.5rem 2rem;
  border-radius: 20px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  text-align: center;
  margin: 0 auto;
}

.icon-wrapper {
  font-size: 3rem;
  color: #003559;
  margin-bottom: 1rem;
}

.icon-wrapper.success {
    color: #06ca9c;
}

.title {
  font-size: 1.6rem;
  font-weight: 700;
  color: #284e36;
  margin-bottom: 0.75rem;
}

.description {
  font-size: 0.95rem;
  color: #666;
  line-height: 1.5;
  margin-bottom: 2rem;
}

.subscription-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.email-input {
  width: 100%;
  padding: 0.9rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  box-sizing: border-box;
}

.submit-button, .cta-button, .back-button {
  width: 100%;
  padding: 0.9rem;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.submit-button {
  background-color: #ff1378;
  color: white;
}

.cta-button {
  background-color: #003559;
  color: white;
}

.back-button {
    background-color: #f1f1f1;
    color: #333;
    margin-top: 1rem;
}

/* --- NUEVOS ESTILOS PARA EL EJEMPLO DE NEWSLETTER --- */
.newsletter-example {
  background: #f9f9f9;
  border: 1px solid #eee;
  border-radius: 8px;
  max-width: 420px; /* Un poco más ancho como un email */
  margin: 0 auto;
  box-shadow: 0 4px 15px rgba(0,0,0,0.07);
  overflow: hidden; /* Para que la imagen respete los bordes */
}

.newsletter-header {
  background-color: #003559;
  color: white;
  padding: 0.75rem 1.5rem;
  text-align: center;
}

.newsletter-header h3 {
  margin: 0;
  font-size: 1.1rem;
}

.newsletter-header p {
  margin: 0;
  font-size: 0.8rem;
  opacity: 0.8;
}

.newsletter-image {
  width: 100%;
  height: auto;
  display: block;
}

.newsletter-content {
  padding: 1.5rem;
  text-align: left;
}

.newsletter-content h2 {
  font-size: 1.5rem;
  color: #333;
  margin-top: 0;
}

.newsletter-content h3 {
  font-size: 1.2rem;
  color: #003559;
  border-bottom: 2px solid #06ca9c;
  padding-bottom: 5px;
  margin-top: 1.5rem;
}

.newsletter-content p {
  line-height: 1.6;
  color: #555;
}

.promo-section {
  background-color: #eaf7f4;
  border: 1px solid #b8dcc8;
  border-radius: 8px;
  padding: 1rem;
  margin-top: 1.5rem;
  text-align: center;
}
.promo-section h4 {
  margin: 0 0 0.5rem 0;
  color: #23704b;
}

.promo-button {
  display: inline-block;
  margin-top: 1rem;
  background-color: #06ca9c;
  color: white;
  padding: 0.6rem 1.2rem;
  text-decoration: none;
  border-radius: 20px;
  font-weight: 600;
}

.newsletter-footer {
  background-color: #f1f1f1;
  padding: 1rem;
  text-align: center;
  font-size: 0.9rem;
  color: #888;
}
</style>