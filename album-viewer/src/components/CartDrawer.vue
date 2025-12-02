<template>
  <Transition name="drawer">
    <div v-if="isCartOpen" class="cart-drawer-overlay" @click.self="closeCart">
      <div class="cart-drawer">
        <div class="cart-header">
          <h2>🛒 Your Cart</h2>
          <button class="close-btn" @click="closeCart" aria-label="Close cart">
            ✕
          </button>
        </div>

        <div class="cart-content">
          <div v-if="cartItems.length === 0" class="empty-cart">
            <span class="empty-icon">🛒</span>
            <p>Your cart is empty</p>
            <span class="empty-hint">Add some albums to get started!</span>
          </div>

          <div v-else class="cart-items">
            <CartItem 
              v-for="album in cartItems" 
              :key="album.id" 
              :album="album"
              @remove="removeFromCart"
            />
          </div>
        </div>

        <div v-if="cartItems.length > 0" class="cart-footer">
          <div class="cart-summary">
            <div class="summary-row">
              <span>Items:</span>
              <span>{{ cartCount }}</span>
            </div>
            <div class="summary-row total">
              <span>Subtotal:</span>
              <span>${{ cartTotal.toFixed(2) }}</span>
            </div>
          </div>
          <div class="cart-actions">
            <button class="btn btn-clear" @click="clearCart">
              Clear Cart
            </button>
            <button class="btn btn-checkout">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useCart } from '../composables/useCart'
import CartItem from './CartItem.vue'

const { cartItems, isCartOpen, closeCart, removeFromCart, clearCart, cartTotal, cartCount } = useCart()
</script>

<style scoped>
.cart-drawer-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  justify-content: flex-end;
}

.cart-drawer {
  width: 100%;
  max-width: 400px;
  height: 100%;
  background: white;
  display: flex;
  flex-direction: column;
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.15);
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.cart-header h2 {
  margin: 0;
  font-size: 1.25rem;
}

.close-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
  color: white;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.cart-content {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
}

.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #999;
  text-align: center;
  padding: 2rem;
}

.empty-icon {
  font-size: 4rem;
  opacity: 0.5;
  margin-bottom: 1rem;
}

.empty-cart p {
  font-size: 1.2rem;
  color: #666;
  margin: 0 0 0.5rem 0;
}

.empty-hint {
  font-size: 0.9rem;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.cart-footer {
  border-top: 1px solid #eee;
  padding: 1.5rem;
  background: #f8f9fa;
}

.cart-summary {
  margin-bottom: 1rem;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  padding: 0.25rem 0;
  color: #666;
}

.summary-row.total {
  font-size: 1.25rem;
  font-weight: bold;
  color: #333;
  padding-top: 0.5rem;
  margin-top: 0.5rem;
  border-top: 1px solid #ddd;
}

.cart-actions {
  display: flex;
  gap: 0.75rem;
}

.btn {
  flex: 1;
  padding: 0.875rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-clear {
  background: transparent;
  color: #666;
  border: 2px solid #ddd;
}

.btn-clear:hover {
  border-color: #ff4757;
  color: #ff4757;
}

.btn-checkout {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-checkout:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

/* Drawer transition animations */
.drawer-enter-active,
.drawer-leave-active {
  transition: all 0.3s ease;
}

.drawer-enter-active .cart-drawer,
.drawer-leave-active .cart-drawer {
  transition: transform 0.3s ease;
}

.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
}

.drawer-enter-from .cart-drawer,
.drawer-leave-to .cart-drawer {
  transform: translateX(100%);
}

@media (max-width: 480px) {
  .cart-drawer {
    max-width: 100%;
  }
}
</style>
