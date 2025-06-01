<template>
    <nav class="bottom-nav">
      <div v-for="item in navItems" :key="item.label" class="nav-item">
        <span class="icon" v-html="item.icon"></span>
        <span class="label">{{ item.label }}</span>
      </div>
    </nav>
  </template>
  
  <script setup>
  const navItems = [
    { icon: "🏠", label: "Inicio" },
    { icon: "💊", label: "Productos" },
    { icon: "💬", label: "Chat" },
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
    background: #eaf5ec;
    border-top: 1px solid #d0e4d8;
    z-index: 100;
  }
  .nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 17px;
    color: #28513d;
  }
  .icon {
    font-size: 22px;
  }
  .label {
    font-size: 12px;
    margin-top: 2px;
  }
  </style>
  