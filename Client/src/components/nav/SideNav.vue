<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref, computed, onMounted } from 'vue'

import { useThemeStore } from '../../stores/theme.store'
const themeStore = useThemeStore()

const theme = computed(() => {
  return themeStore.theme
})

const openSideNav = ref(false)

const expanded = ref(false)

import { useTimerStore } from '@/stores/timer.store'
const { allTimers } = storeToRefs(useTimerStore())

import Timer from '../timers/Timer.vue'
import TransitionExpand from '../transitions/TransitionExpand.vue'
import { storeToRefs } from 'pinia'

onMounted(() => {
  let isLocked = JSON.parse(localStorage.getItem('isNavLocked'))
  isNavLocked.value = isLocked
  // if (isNavLocked.value) openSideNav.value = true
})

const isNavLocked = ref(false)

const toggleNavLock = () => {
  isNavLocked.value = !isNavLocked.value
  openSideNav.value = !openSideNav.value
  localStorage.setItem('isNavLocked', isNavLocked.value)
}

const showNav = () => {
  // console.log(`isNavLocked.value: ${isNavLocked.value}`)
  if (isNavLocked.value == 'false' || isNavLocked.value == false) openSideNav.value = true
}

const hideNav = () => {
  // console.log(`isNavLocked.value: ${isNavLocked.value}`)
  if (!isNavLocked.value) openSideNav.value = false
}



// Notification Logic
import NotificationBubble from '@/components/notifications/notificationBubble.vue'
import notificationService from '@/utils/notificationService.js'

const notifications = computed(() => notificationService.notifications)

const triggerNotification = (message, type, duration, persistent) => {
  notificationService.addNotification(message, 'success', 3000)
}

const handleNotificationClick = (id) => {
  notificationService.removeNotification(id)
}

</script>
<template>
  <div class="wrapper">

    <transition-group name="notification" tag="div" class="notification-container">
      <NotificationBubble v-for="notification in notifications" :key="notification.id" :message="notification.message"
        :type="notification.type" :visible="true" @click="handleNotificationClick(notification.id)" />
    </transition-group>

    <div class="sidebar" :class="{ open: openSideNav }" @mouseenter="showNav()" @mouseleave="hideNav()">
      <div class="toggle-container">
        <li class="toggle-btn-container">
          <!-- <span class="material-symbols-outlined toggle-btn" @click="toggleNavLock()">
            {{ isNavLocked ? 'lock_open' : 'lock' }}
          </span> -->
          <!-- <i :class="['bx', { 'bx-lock-open': !isNavLocked, 'bx-lock': isNavLocked }]" @click="toggleNavLock()" /> -->
          <i :class="isNavLocked ? 'bx bx-lock' : 'bx bx-lock-open-alt'" @click="toggleNavLock()" />
        </li>
      </div>

      <!-- <div class="logo-details">
                    <i class="bx bxl-c-plus-plus icon"></i>
                    <div class="logo_name">Templates</div>
                    <i
                        :class="[[openSideNav ? 'bx-menu' : 'bx-menu-alt-right'], 'bx']"
                        id="btn"
                        @click="openSideNav = !openSideNav"
                    ></i>
                    <i
                        :class="[[openSideNav ? 'bx-menu' : 'bx-menu-alt-right'], 'bx']"
                        id="btn"
                        @click="toggleNavLock()"
                    >
                    </i>
                </div> -->
      <ul class="nav-list">
        <li>
          <i class="bx bx-search" @click="openSideNav = !openSideNav"></i>
          <input type="text" placeholder="Search..." />
          <span class="tooltip">Search</span>
        </li>
        <li>
          <a href="#">
            <RouterLink to="/">
              <i class="bx bx-grid-alt"></i>
              <span class="links_name">Dashboard</span>
            </RouterLink>
          </a>
          <span class="tooltip">Dashboard</span>
        </li>
        <li>
          <a href="#">
            <RouterLink to="/draganddrop">
              <i class="bx bx-timer"></i>
              <span class="links_name">Timers</span>
            </RouterLink>
          </a>
          <span class="tooltip">Timers</span>
        </li>
        <li>
          <a href="#">
            <RouterLink to="/timers">
              <i class="bx bx-timer"></i>
              <span class="links_name">Timers</span>
              <!-- <button @click="expanded = !expanded">
                                    {{ expanded ? `Hide` : `Show` }}
                                </button> -->
            </RouterLink>
          </a>
          <span class="tooltip">Timers</span>
          <TransitionExpand class="accordion">
            <div v-if="expanded">
              <div v-for="timer in allTimers" :key="timer">
                <Timer :timer="timer" />
              </div>
            </div>
          </TransitionExpand>
        </li>
        <li>
          <a href="#">
            <RouterLink to="/user">
              <i class="bx bx-user"></i>
              <span class="links_name">User</span>
            </RouterLink>
          </a>
          <span class="tooltip">User</span>
        </li>
        <li>
          <a href="#">
            <RouterLink to="/todo">
              <i class="bx bx-list-ul"></i>
              <span class="links_name">Todo</span>
            </RouterLink>
          </a>
          <span class="tooltip">Todo</span>
        </li>
        <li>
          <a href="#">
            <RouterLink to="/notes">
              <i class="bx bx-edit"></i>
              <span class="links_name">Notes</span>
            </RouterLink>
          </a>
          <span class="tooltip">Notes</span>
        </li>
        <li>
          <a href="#">
            <RouterLink to="/messages">
              <i class="bx bx-chat"></i>
              <span class="links_name">Messages</span>
            </RouterLink>
          </a>
          <span class="tooltip">Messages</span>
        </li>
        <li>
          <a href="#">
            <i class="bx bx-pie-chart-alt-2"></i>
            <span class="links_name">Analytics</span>
          </a>
          <span class="tooltip">Analytics</span>
        </li>
        <li>
          <a href="#">
            <i class="bx bx-folder"></i>
            <span class="links_name">File Manager</span>
          </a>
          <span class="tooltip">Files</span>
        </li>
        <li>
          <a href="#">
            <RouterLink link to="/shop">
              <i class="bx bx-cart-alt"></i>
              <span class="links_name">Shop</span>
            </RouterLink>
          </a>
          <span class="tooltip">Shop</span>
        </li>
        <li>
          <a href="#">
            <i class="bx bx-heart"></i>
            <span class="links_name">Saved</span>
          </a>
          <span class="tooltip">Saved</span>
        </li>
        <li>
          <a href="#">
            <RouterLink link to="/maps">
              <i class="bx bx-map"></i>
              <span class="links_name">Maps</span>
            </RouterLink>
          </a>
          <span class="tooltip">Maps</span>
        </li>
        <li>
          <a href="#">
            <RouterLink to="/settings">
              <i class="bx bx-cog"></i>
              <span class="links_name">Setting</span>
            </RouterLink>
          </a>
          <span class="tooltip">Setting</span>
        </li>
        <li class="profile">
          <div class="profile-details">
            <!-- <img src="profile.jpg" alt="profileImg" /> -->
            <div class="name_job">
              <div class="name">Alexander Ege</div>
              <div class="job">Software Developer</div>
            </div>
          </div>
          <i class="bx bx-log-out" id="log_out"></i>
        </li>
      </ul>
    </div>
    <section class="home-section" :class="theme">
      <RouterView />
    </section>

  </div>
</template>
<style scoped>
/* Google Font Link */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 78px;
  background: #11101d;
  padding: 6px 14px;
  z-index: 99;
  transition: all 0.5s ease;
}

.sidebar.open {
  width: 250px;
}

.sidebar .toggle-btn-container {
  height: 50px;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 12px;
  text-decoration: none;
  transition: all 0.4s ease;
}

.sidebar .toggle-btn-container:hover {
  background: #fff;
}

.sidebar .toggle-container {
  display: flex;
  flex-direction: row;
  /* justify-content: center; */
  align-items: center;
  /* overflow: hidden; */
  height: 50px;
}

.sidebar .toggle-btn {
  color: white;
  /* position: absolute; */
  /* top: 50%; */
  /* right: 0; */
  /* transform: translateY(-50%); */
  font-size: 22px;
  transition: all 0.4s ease;
  font-size: 23px;
  text-align: center;
  cursor: pointer;
  transition: all 0.5s ease;
}

.sidebar .toggle-btn:hover {
  color: black;
}

.sidebar .logo-details {
  height: 60px;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.sidebar .logo-details .icon {
  opacity: 0;
  transition: all 0.5s ease;
}

.sidebar .logo-details .logo_name {
  color: #fff;
  font-size: 20px;
  font-weight: 600;
  opacity: 0;
  transition: all 0.5s ease;
}

.sidebar.open .logo-details .icon,
.sidebar.open .logo-details .logo_name {
  opacity: 1;
}

/* .sidebar .logo-details #btn {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    font-size: 22px;
    transition: all 0.4s ease;
    font-size: 23px;
    text-align: center;
    cursor: pointer;
    transition: all 0.5s ease;
}
.sidebar.open .logo-details #btn {
    text-align: right;
} */
.sidebar i {
  color: #fff;
  height: 60px;
  min-width: 50px;
  font-size: 28px;
  text-align: center;
  line-height: 60px;
}

.sidebar .nav-list {
  margin-top: 20px;
  height: 100%;
}

.sidebar li {
  position: relative;
  margin: 8px 0;
  list-style: none;
}

.sidebar li .tooltip {
  position: absolute;
  top: -20px;
  left: calc(100% + 15px);
  z-index: 3;
  background: #fff;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 15px;
  font-weight: 400;
  opacity: 0;
  white-space: nowrap;
  pointer-events: none;
  transition: 0s;
}

.sidebar li:hover .tooltip {
  opacity: 1;
  pointer-events: auto;
  transition: all 0.4s ease;
  top: 50%;
  transform: translateY(-50%);
}

.sidebar.open li .tooltip {
  display: none;
}

.sidebar input {
  font-size: 15px;
  color: #fff;
  font-weight: 400;
  outline: none;
  height: 50px;
  width: 100%;
  width: 50px;
  border: none;
  border-radius: 12px;
  transition: all 0.5s ease;
  background: #1d1b31;
}

.sidebar.open input {
  padding: 0 20px 0 50px;
  width: 100%;
}

.sidebar .bx-search {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  font-size: 22px;
  background: #1d1b31;
  color: #fff;
}

.sidebar.open .bx-search:hover {
  background: #1d1b31;
  color: #fff;
}

.sidebar .bx-search:hover {
  background: #fff;
  color: #11101d;
}

.sidebar li a {
  display: flex;
  height: 100%;
  width: 100%;
  border-radius: 12px;
  align-items: center;
  text-decoration: none;
  transition: all 0.4s ease;
  background: #11101d;
}

.sidebar li a:hover {
  background: #fff;
}

.sidebar li a .links_name {
  color: #fff;
  font-size: 15px;
  font-weight: 400;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: 0.4s;
}

.sidebar.open li a .links_name {
  opacity: 1;
  pointer-events: auto;
}

.sidebar li a:hover .links_name,
.sidebar li a:hover i {
  transition: all 0.5s ease;
  color: #11101d;
}

.sidebar li i {
  height: 50px;
  line-height: 50px;
  font-size: 18px;
  border-radius: 12px;
}

.sidebar li.profile {
  position: fixed;
  height: 60px;
  width: 78px;
  left: 0;
  bottom: -8px;
  padding: 10px 14px;
  background: #1d1b31;
  transition: all 0.5s ease;
  overflow: hidden;
}

.sidebar.open li.profile {
  width: 250px;
}

.sidebar li .profile-details {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
}

.sidebar li img {
  height: 45px;
  width: 45px;
  object-fit: cover;
  border-radius: 6px;
  margin-right: 10px;
}

.sidebar li.profile .name,
.sidebar li.profile .job {
  font-size: 15px;
  font-weight: 400;
  color: #fff;
  white-space: nowrap;
}

.sidebar li.profile .job {
  font-size: 12px;
}

.sidebar .profile #log_out {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  background: #1d1b31;
  width: 100%;
  height: 60px;
  line-height: 60px;
  border-radius: 0px;
  transition: all 0.5s ease;
}

.sidebar.open .profile #log_out {
  width: 50px;
  background: none;
}

.home-section {
  /* padding: 50px; */
  /* border: 1px solid lime; */
  position: relative;
  /* background: #e4e9f7; */
  /* min-height: 100vh; */
  top: 0;
  left: 78px;
  width: calc(100% - 78px);
  transition: all 0.5s ease;
  z-index: 5;
  background-color: black;
}

.sidebar.open~.home-section {
  left: 250px;
  width: calc(100% - 250px);
}

.home-section .text {
  /* display: inline-block; */
  color: #11101d;
  font-size: 25px;
  font-weight: 500;
  margin: 18px;
}

@media (max-width: 420px) {
  .sidebar li .tooltip {
    display: none;
  }
}

/* Light / Dark  */
.dark {
  background-color: black;
  color: white;
}

.light {
  background-color: white;
  color: black;
}

.accordion {
  color: white;
}

/* Notification Styles */
/* Notification Animations */
.notification-container {
  position: fixed;
  bottom: 20px;
  /* Stick to bottom */
  right: 20px;
  display: flex;
  flex-direction: column-reverse;
  /* New notifications go to bottom */
  gap: 10px;
  z-index: 1000;
}

.notification-enter-active,
.notification-leave-active {
  transition: all 0.5s ease;
}

.notification-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.notification-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.notification-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.notification-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
