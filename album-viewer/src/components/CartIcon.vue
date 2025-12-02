<template>
  <button class="cart-icon-btn" @click="toggleCart" aria-label="Shopping cart">
    <span class="cart-icon">🛒</span>
    <span v-if="cartCount > 0" class="cart-badge">{{ cartCount }}</span>
  </button>
</template>

<script setup lang="ts">
import { useCart } from '../composables/useCart'

const { cartCount, toggleCart } = useCart()
</script>

<style scoped>
.cart-icon-btn {
  position: relative;
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cart-icon-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.5);
  transform: scale(1.05);
}

.cart-icon {
  font-size: 1.5rem;
}

.cart-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background: #ff4757;
  color: white;
  font-size: 0.75rem;
  font-weight: bold;
  min-width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
  animation: pop 0.3s ease;
}

@keyframes pop {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>
