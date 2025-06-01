<template>
    <header class="topbar">
      <h2>Farmacia Grupo 3</h2>
      <div class="icons">
        <span>👤</span>
        <span>🔔</span>
      </div>
    </header>
  </template>
  
  <style scoped>
  header.topbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
}
  .topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px;
    background: #eaf5ec;
    border-radius: 0 0 20px 20px;
  }

  .icons span {
    font-size: 22px;
    margin-left: 12px;
  }
  </style>
  