import { defineStore } from 'pinia'
export const useShopStore = defineStore('shop', {
  state: () => ({
    items: [
      {
        id: 1,
        name: 'Item One',
        cost: 1234,
        author: 'player name',
        quantity: 1
      },
      {
        id: 2,
        name: 'Item Two',
        cost: 987,
        author: 'player name',
        quantity: 1
      },
      {
        id: 3,
        name: 'Item Three',
        cost: 2345,
        author: 'player name',
        quantity: 1
      },
      {
        id: 4,
        name: 'Item Four',
        cost: 678,
        author: 'player name',
        quantity: 1
      },
      {
        id: 5,
        name: 'Item Five',
        cost: 1450,
        author: 'player name',
        quantity: 1
      },
      {
        id: 6,
        name: 'Item Six',
        cost: 2100,
        author: 'player name',
        quantity: 1
      },
      {
        id: 7,
        name: 'Item Seven',
        cost: 300,
        author: 'player name',
        quantity: 1
      },
      {
        id: 8,
        name: 'Item Eight',
        cost: 1800,
        author: 'player name',
        quantity: 1
      },
      {
        id: 9,
        name: 'Item Nine',
        cost: 2222,
        author: 'player name',
        quantity: 1
      },
      {
        id: 10,
        name: 'Item Ten',
        cost: 500,
        author: 'player name',
        quantity: 1
      },
      {
        id: 11,
        name: 'Item Eleven',
        cost: 765,
        author: 'player name',
        quantity: 1
      },
      {
        id: 12,
        name: 'Item Twelve',
        cost: 4300,
        author: 'player name',
        quantity: 1
      },
      {
        id: 13,
        name: 'Item Thirteen',
        cost: 320,
        author: 'player name',
        quantity: 1
      },
      {
        id: 14,
        name: 'Item Fourteen',
        cost: 1590,
        author: 'player name',
        quantity: 1
      },
      {
        id: 15,
        name: 'Item Fifteen',
        cost: 910,
        author: 'player name',
        quantity: 1
      },
      {
        id: 16,
        name: 'Item Sixteen',
        cost: 2750,
        author: 'player name',
        quantity: 1
      }
    ],
    cart: [],
    loading: false,
    error: null
  }),
  getters: {
    totalItemsInCart: (state) => {
      return state.cart.reduce((total, item) => total + item.quantity, 0)
    },
    cartTotalPrice: (state) => {
      return state.cart.reduce((total, item) => total + item.price * item.quantity, 0)
    }
  },
  actions: {
    addToCart(itemId, quantity) {
      console.log('items;', this.items)
      console.log('adding item:', itemId, 'quantity:', quantity)
      const item = this.items.find((i) => i.id === itemId)
      if (item && quantity > 0 && quantity <= item.quantity) {
        const cartItem = this.cart.find((i) => i.id === itemId)
        if (cartItem) {
          cartItem.quantity += quantity
        } else {
          this.cart.push({ ...item, quantity })
        }
        item.quantity -= quantity
      }
    },
    removeFromCart(itemId) {
      const index = this.cart.findIndex((i) => i.id === itemId)
      if (index !== -1) {
        const item = this.cart[index]
        this.cart.splice(index, 1)
        const stockItem = this.items.find((i) => i.id === itemId)
        if (stockItem) {
          stockItem.quantity += item.quantity
        }
      }
    },
    clearCart() {
      this.cart.forEach((item) => {
        const stockItem = this.item.find((i) => i.id === item.id)
        if (stockItem) {
          stockItem.quantity += item.quantity
        }
      })
      this.cart = []
    }
  }
})
// <!-- src/components/Shop.vue -->
// <template>
//   <div>
//     <h1>Shop</h1>
//     <div v-for="item in items" :key="item.id">
//       <h2>{{ item.name }}</h2>
//       <p>Price: ${{ item.price.toFixed(2) }}</p>
//       <p>Available: {{ item.quantity }}</p>
//       <button @click="addToCart(item.id, 1)">Add to Cart</button>
//     </div>
//     <h2>Cart</h2>
//     <div v-for="item in cart" :key="item.id">
//       <h3>{{ item.name }} - {{ item.quantity }} x ${{ item.price.toFixed(2) }}</h3>
//       <button @click="removeFromCart(item.id)">Remove from Cart</button>
//     </div>
//     <p>Total items in cart: {{ totalItemsInCart }}</p>
//     <p>Total price: ${{ cartTotalPrice }}</p>
//     <button @click="clearCart">Clear Cart</button>
//   </div>
// </template>
// <script setup>
// import { useShopStore } from '@/stores/shopStore';
// import { computed } from 'vue';
// const shopStore = useShopStore();
// const items = computed(() => shopStore.items);
// const cart = computed(() => shopStore.cart);
// const totalItemsInCart = computed(() => shopStore.totalItemsInCart);
// const cartTotalPrice = computed(() => shopStore.cartTotalPrice);
// function addToCart(itemId, quantity) {
//   shopStore.addToCart(itemId, quantity);
// }
// function removeFromCart(itemId) {
//   shopStore.removeFromCart(itemId);
// }
// function clearCart() {
//   shopStore.clearCart();
// }
// </script>
