<template>
  <header class="topbar">
    <router-link to="/" class="pharmacy-home-link">
      <div class="pharmacy-info">
        <img src="/FarmApp2.png" alt="Avatar de usuario" class="pharmacy-icon" />
      </div>
    </router-link>
    
    <div class="icons">
<div class="user-greeting-section"> <div class="user-avatar-container">
        <img src="/user.png" alt="Avatar de usuario" class="user-avatar" />
      </div></div>
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
  padding: 8px;
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
  width:105px;
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

.user-greeting-section {
  display: flex;
  align-items: center;
}

.user-avatar-container {
  width: 50px; 
  height: 50px; 
  border-radius: 50%;
  overflow: hidden; 
    border: 2px solid #e0e0e0; 
  flex-shrink: 0; 
}

.user-avatar {
  width: 100%;
  height: 100%;
  object-fit: cover; 
}

</style>