<script setup>
import SideNav from './components/nav/SideNav.vue'

import { ref } from 'vue'

//Get theme from localStorage
const primaryColor = localStorage.getItem('primary-color')
const secondaryColor = localStorage.getItem('secondary-color')

//Set theme colors
if (primaryColor) document.documentElement.style.setProperty('--primary-color', primaryColor)
if (secondaryColor) document.documentElement.style.setProperty('--secondary-color', primaryColor)
</script>

<template>
  <SideNav />
</template>

<style>
.router-view {
  height: 100vh;
}
</style>
