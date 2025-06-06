<template>
    <nav class="bottom-nav">
      <router-link
        v-for="item in navItems"
        :key="item.label"
        :to="item.route"
        class="nav-item"
      >
         <font-awesome-icon :icon="item.icon" class="icon" />
        <span class="label">{{ item.label }}</span>
      </router-link>
    </nav>
  </template>
  
  
  <script setup>
  const navItems = [
    { icon: "home", label: "Inicio", route: "/" },
    { icon: "pills", label: "Productos", route: '/buscador' },
    { icon: "comment-dots", label: "Chat", route: '/consulta' },
  ];
  </script>
  
  <style scoped>
.bottom-nav {
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 0; left: 0; right: 0;
  height: 62px;
  border-top: 2px solid #003559;
  z-index: 100;
  background-color: #fff;
  box-shadow: 0 -2px 5px rgba(0,0,0,0.1);
}
.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 17px;
  color: #003559; 
  text-decoration: none; 
}

.icon {
  font-size: 22px;
}
.label {
  font-size: 12px;
  margin-top: 2px;
}


.nav-item.router-link-active .icon {
  color: #003559;
}
.nav-item.router-link-active .label {
  color: #003559; 
  font-weight: bold; 
}
</style>