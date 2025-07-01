<script setup>
import ShopItem from '@/components/shop/shopItem.vue'
import searchBar from '@/components/search/searchBar.vue'
import { computed } from 'vue'
import { useShopStore } from '@/stores/shop.store'
const shopStore = useShopStore()
const items = computed(() => shopStore.items)
const cart = computed(() => shopStore.cart)
const totalItemsInCart = computed(() => shopStore.totalItemsInCart)
const cartTotalPrice = computed(() => shopStore.cartTotalPrice)
const addToCart = (itemId, quantity) => {
    shopStore.addToCart(itemId, quantity)
}
const removeFromCart = (itemId) => {
    shopStore.removeFromCart(itemId)
}
const clearCart = () => {
    shopStore.clearCart()
}
//Shop integration///////////////////////
import NotificationBubble from '@/components/notifications/notificationBubble.vue'
import notificationService from '@/utils/notificationService.js'
const notifications = computed(() => notificationService.notifications)
const triggerNotification = () => {
    notificationService.addNotification('This is a notification!', 'success')
}
const handleNotificationClick = (id) => {
    notificationService.removeNotification(id)
}
//Shop integration///////////////////////
</script>
<template>
    <div class="shop-container">
        <button @click="triggerNotification">Trigger Notification</button>

        <NotificationBubble v-for="notification in notifications" :key="notification.id" :message="notification.message"
            :type="notification.type" :visible="true" @click="handleNotificationClick(notification.id)" />
        <h2>Shop View</h2>
        <div>Cart: ({{ totalItemsInCart }})</div>
        <div>Total: ({{ cartTotalPrice }})</div>

        <searchBar />
        <div class="grid-container">

            <ShopItem :item="item" v-for="item in items" :key="item" />

        </div>

    </div>
</template>
<style scoped>
.shop-container {
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
    /* width: 100vw; */
    margin: 0 auto;
    height: 100vh;
    /* background-color: #3693af; */
}

.grid-item {
    display: flex;
    align-items: center;
    justify-content: center;
    /* outline: 1px solid black; */
}

.grid-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    /* grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); */
    /* grid-template-rows: repeat(4, 1fr); */
    /* grid-template-rows: repeat(4, minmax(0, 150px)); */
    gap: 15px;
    padding: 0 2em;
    /* width: 80vw; */
    /* height: 80vh; */
    /* background-color: #3693af; */
}
</style>