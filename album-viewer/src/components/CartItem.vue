<template>
  <div class="cart-item">
    <img 
      :src="album.image_url" 
      :alt="album.title"
      class="cart-item-image"
      @error="handleImageError"
    />
    <div class="cart-item-info">
      <h4 class="cart-item-title">{{ album.title }}</h4>
      <p class="cart-item-artist">{{ album.artist }}</p>
      <span class="cart-item-price">${{ album.price.toFixed(2) }}</span>
    </div>
    <button 
      class="remove-btn" 
      @click="$emit('remove', album.id)"
      aria-label="Remove from cart"
    >
      ✕
    </button>
  </div>
</template>

<script setup lang="ts">
import type { Album } from '../types/album'

// SVG placeholder as data URI to avoid external dependency
const PLACEHOLDER_IMAGE = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"%3E%3Crect fill="%23667eea" width="60" height="60"/%3E%3Ctext x="50%25" y="50%25" fill="white" font-size="10" text-anchor="middle" dy=".3em"%3EAlbum%3C/text%3E%3C/svg%3E'

interface Props {
  album: Album
}

defineProps<Props>()
defineEmits<{
  (e: 'remove', id: number): void
}>()

const handleImageError = (event: Event): void => {
  const target = event.target as HTMLImageElement
  target.src = PLACEHOLDER_IMAGE
}
</script>

<style scoped>
.cart-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  transition: background 0.2s ease;
}

.cart-item:hover {
  background: #f1f3f4;
}

.cart-item-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 6px;
  flex-shrink: 0;
}

.cart-item-info {
  flex: 1;
  min-width: 0;
}

.cart-item-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 0.25rem 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cart-item-artist {
  font-size: 0.85rem;
  color: #666;
  margin: 0 0 0.25rem 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cart-item-price {
  font-size: 0.9rem;
  font-weight: bold;
  color: #667eea;
}

.remove-btn {
  background: transparent;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  color: #999;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.remove-btn:hover {
  background: #fee;
  color: #ff4757;
}
</style>
