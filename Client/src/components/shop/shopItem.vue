<script setup>
import { ref, computed } from 'vue'
const props = defineProps(['item'])
const balance = ref(0)
const priceClass = computed(() => {
    const affordable = balance.value >= props.item.cost
    return affordable ? 'affordable' : 'unaffordable'
})
import { useShopStore } from '@/stores/shop.store'
const shopStore = useShopStore()
const addToCart = (itemId, quantity) => {
    shopStore.addToCart(itemId, quantity)
}
</script>
<template>
    <div :class="{ 'out-of-stock': props.item.quantity == 0 }" class="shop-item">
        <div class="item">
            <img src="" alt="" />
            <label for="">{{ props.item.name }}</label>
        </div>
        <span>Posted by @{{ props.item.author }}</span>
        <button @click="addToCart(props.item.id, 1)" class="item-button">
            <span>Buy</span>
            <span class="material-symbols-outlined"> hexagon </span>
            <span :class="priceClass">{{ props.item.cost }}</span>
        </button>
    </div>
</template>
<style scoped>
.item,
.item-button,
.shop-item {
    transition: opacity 0.25s ease;
}

.out-of-stock .item,
.out-of-stock .item-button,
.out-of-stock .shop-item {
    filter: grayscale(100%);
    opacity: 0.25;
    pointer-events: none;
}

/* .item.out-of-stock {
  background-color: red !important;
  color: red !important;
} */
.shop-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* outline: 1px solid black; */
    background-color: #052530;
}

img {
    width: 75px;
    height: 75px;
}

.item {
    width: 100%;
    /* height: 100%; */
    display: flex;
    flex-direction: row;
    align-items: center;
    /* justify-content: space-around; */
    justify-content: center;
    /* background-color: #052530; */
    color: white;
}

.item img {
    padding: 1em 0 1em 1em;
    flex: 1;
}

.item label {
    flex: 3;
    padding: 0.5em;
    text-align: center;
    word-wrap: break-word;
}

button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: #011a22;
    border: 1px solid #174c5c;
    color: white;
    padding: 0.25em 0.5em;
}

button:hover {
    background-color: #174c5c;
    cursor: pointer;
}

button span {
    font-size: 15px;
    padding: 0 2.5px;
}

.affordable {
    color: white;
}

.unaffordable {
    color: red;
}

/* #052530 */
/* #011a22 */
/* #174c5c */
</style>
