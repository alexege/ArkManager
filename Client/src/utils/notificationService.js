import { reactive, ref } from 'vue'

let idCounter = 0
const notifications = reactive([])
const addNotification = (message, type = 'info', duration = 3000, persistent = false) => {
  const id = idCounter++
  const notification = { id, message, type, persistent }
  notifications.push(notification)
  if (!persistent) {
    setTimeout(() => {
      removeNotification(id)
    }, duration)
  }
}
const removeNotification = (id) => {
  const index = notifications.findIndex((notification) => notification.id === id)
  if (index !== -1) {
    notifications.splice(index, 1)
  }
}
export default {
  notifications,
  addNotification,
  removeNotification
}
