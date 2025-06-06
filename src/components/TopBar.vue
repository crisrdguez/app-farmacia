<template>
  <header class="topbar">
    <router-link to="/" class="pharmacy-home-link">
      <div class="pharmacy-info">
        <font-awesome-icon icon="plus" class="pharmacy-icon" />
        <h2>Farmacia Grupo 2</h2>
      </div>
    </router-link>
    <div class="icons">
      <font-awesome-icon icon="user" />
      <font-awesome-icon icon="bell" />
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px;
  background: #003559;
  color: aliceblue;
  border-radius: 0 0 20px 20px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}

.pharmacy-info {
  display: flex;
  align-items: center;
}

.pharmacy-icon {
  font-size: 24px;
  margin-right: 8px;
  color: aliceblue;
}

.topbar h2 {
  font-size: 20px;
  margin: 0;
  color: aliceblue;
}

.icons {
  display: flex;
  align-items: center;
  gap:8px;
}

.icons svg {
  font-size: 22px;
  margin-left: 12px;
  color: aliceblue;
  cursor: pointer;
}
</style>