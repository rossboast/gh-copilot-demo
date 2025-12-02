import { ref, computed, watch } from 'vue'
import type { Album } from '../types/album'

const CART_STORAGE_KEY = 'album-viewer-cart'

// Reactive state shared across all components
const cartItems = ref<Album[]>([])
const isCartOpen = ref(false)

// Validate that an item has the expected Album structure
const isValidAlbum = (item: unknown): item is Album => {
  return (
    typeof item === 'object' &&
    item !== null &&
    typeof (item as Album).id === 'number' &&
    typeof (item as Album).title === 'string' &&
    typeof (item as Album).artist === 'string' &&
    typeof (item as Album).price === 'number' &&
    typeof (item as Album).image_url === 'string'
  )
}

// Load cart from localStorage on initialization
const loadCartFromStorage = (): void => {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      if (Array.isArray(parsed) && parsed.every(isValidAlbum)) {
        cartItems.value = parsed
      } else {
        console.warn('Invalid cart data in localStorage, resetting cart')
        cartItems.value = []
      }
    }
  } catch (error) {
    console.error('Error loading cart from localStorage:', error)
  }
}

// Save cart to localStorage
const saveCartToStorage = (): void => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems.value))
  } catch (error) {
    console.error('Error saving cart to localStorage:', error)
  }
}

// Initialize cart from localStorage
loadCartFromStorage()

// Watch for changes and persist to localStorage
watch(cartItems, saveCartToStorage, { deep: true })

export function useCart() {
  const addToCart = (album: Album): void => {
    if (!isInCart(album.id)) {
      cartItems.value = [...cartItems.value, album]
    }
  }

  const removeFromCart = (albumId: number): void => {
    cartItems.value = cartItems.value.filter(item => item.id !== albumId)
  }

  const clearCart = (): void => {
    cartItems.value = []
  }

  const toggleCart = (): void => {
    isCartOpen.value = !isCartOpen.value
  }

  const closeCart = (): void => {
    isCartOpen.value = false
  }

  const cartTotal = computed(() => {
    return cartItems.value.reduce((total, item) => total + item.price, 0)
  })

  const cartCount = computed(() => cartItems.value.length)

  const isInCart = (albumId: number): boolean => {
    return cartItems.value.some(item => item.id === albumId)
  }

  return {
    cartItems,
    isCartOpen,
    addToCart,
    removeFromCart,
    clearCart,
    toggleCart,
    closeCart,
    cartTotal,
    cartCount,
    isInCart
  }
}
